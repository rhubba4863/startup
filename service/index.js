/**
 * Week 9-10 Athentication
 */
//import React from 'react';

/**
 * Endpoint Ideas
 * 1) Create User
 * 2) Checkout user info
 * 3) Login User
 * 4) Logout User
 * 5) Add new score
 * 6) Return all scores (or maybe just top 10???)
 * 7) Get the Question, options, and the answer
 */

/**
 * Encryption
 */

//Express Tools
const express = require('express');
const app = express();
//Cookie and encryption tools
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
//Database link
const DB = require('./database.js');
const authCookieName = 'token';
const { peerGroup } = require('./peerGroup.js');

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

//Save Questions and the rounds 
// (Note - They will delete/reset from system when the service is restarted.)
let questions = [];
let recentScore = 0;
let aRound = 99;
let roundNumber = 0;

//const [recentScore, setRecentScore] = React.useState(0);

// Allow your code to select a port to run on based on the command line parameters.
// The service port. In production the front-end code is statically hosted by 
// the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
//Trust headers 
app.set('trust proxy', true);

/**
 * Express static middleware to serve files from the public directory once your 
 * code has been deployed to your AWS server.
 */
// Serve up the front-end static content hosting
app.use(express.static('public'));
// JSON body parsing using built-in middleware
app.use(express.json()); 

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/finished', async (req, res) => {
  //setRecentScore(req.body.score);
  recentScore = req.body.score;
});


/**
 * Create a new User
 */
apiRouter.post('/auth/create', async (req, res) => {
  // First check if username is already used, otherwise login 
  if (await getUser('userName', req.body.userName)) {
    res.status(409).send({ msg: 'User already Exists' });
  } else {
    const user = await createUser(req.body.userName, req.body.password);
    setAuthCookie(res, user);

    res.send({ userName: user.userName });
  }
});

/**
 * Log onto an existing user, returning "GetAuth token"
 */
apiRouter.put('/auth/login', async (req, res) => {
  const user = await getUser('userName', req.body.userName);

  //Look for user, setting up token and Cookie if found
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      //Step to add user to Database
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ userName: user.userName });

      // console.log("AGAIN"+);
      return;
    }
  }
  res.status(401).send({ msg: 'Wrong Username or Password' });
});

/**
 * Log off of current user "if stored in cookie"
 */
apiRouter.delete('/auth/logout', async (req, res) => {
  //Look for user, deleting its token if found. 
  const user = await getUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    //Database updates user one/off
    DB.updateUser(user);
  }
  //Delete cookie of token
  res.clearCookie(authCookieName);
  res.status(204).end();
});

/**
 * Setup a user with a hashed password
 */
async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  //Now add the user and his features
  await DB.addUser(user);

  return user;
}

/**
 * Find a User and return his details, identifying normally through the 
 * token and  cookies
 */
async function getUser(field, value) {
  //RPH First check the user value isnt null
  if (!value) return null;
  
  //RPH now find the user by its value or token
  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
  
  // return users.find((u) => u[field] === value);
}

// Middleware to check user is logged on and has permission
const checkUserPermission= async (req, res, next) =>{
  const user = await getUser('userName', req.body.userName);
  //const user = await getUser('token', req.cookies[authCookieName]);

  // console.log("User1="+user);
  // console.log("User2="+req.body.userName);
  // console.log("User3="+getUser('userName', req.body.userName));
  // console.log("User4="+authCookieName);
  // console.log("User5="+req.cookies[authCookieName]);
  // console.log("User6="+getUser('token', req.cookies[authCookieName]));
  // console.log(getUser('userName', req.body.userName));
  // console.log(req.cookies[authCookieName]);
  // console.log(getUser('token', req.cookies[authCookieName]));


  //RPH - Check if user exists, then use next task
  if(user){
    next();
  }else {
    //Else tell user he doesnt have permission 
    res.status(401).send({ msg: 'Unauthorized - not logged in88' });
  }
}

/**
 * First check if logged on, then Add 1 score if logged in
 */
apiRouter.post('/score', checkUserPermission, async (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

/**
 * Return all scores (Note the async position)
 */
apiRouter.get('/records', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});


/**
 * Setup a cookie for user created or being logged onto
 */
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// updateScores considers a new score for inclusion in the high scores.
async function updateScores(newScore) {
  /*let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }
  
  if (!found) {
    scores.push(newScore);
  }
  
  if (scores.length > 10) {
    scores.length = 10;
  }
  
  return scores;*/

  //Database now decides if score belongs
  await DB.addScore(newScore);
  return DB.getHighScores();
}


/**
 * Create Trivia Questions
 */
apiRouter.get('/question/make', async (req, res) => {    
  //RPH maybe delete any before grabbing it
  await createTriviaQuestions();
  res.send(await getQuestion(0));

  let house = "homely"
  return {house};
});

/**
 * Get a Trivia Questions
 */
apiRouter.post('/question/set', async (req, res) => {  
  //Calls on exact question 
  res.send({task: await getQuestion(req.body.number)});
});

apiRouter.get('/question/get', async (req, res) => {
  roundNumber = roundNumber +1;    

  //res.send({ userName: user.userName });
  res.send(await getQuestion(roundNumber));
});

apiRouter.get('/question/reset', async (req, res) => {
  roundNumber = 0;    

  //res.send({ userName: user.userName });
  res.send(await getQuestion(roundNumber));
});

async function createTriviaQuestions() {
  //Fetch all 10 questions
  const response = await fetch(
    'https://opentdb.com/api.php?amount=15&category=11&type=multiple', {
      method: 'GET',
      headers:{'Content-type': 'application/json; charset=UTF-8'},
    }
  ) 
  const data = await response.json();
  aRound = data;
  //restart on first question
  roundNumber = 0;
}

/**
 * Retrieve the Question and options, knowing right/wrong. q is roung number
 */
async function getQuestion(q){
  let Random = Math.floor(Math.random() * 4)
  
  const task = {
    round: q,
    question: replaceQuote(aRound.results[q].question),
    answer: replaceQuote(aRound.results[q].correct_answer),
    wrong1: replaceQuote(aRound.results[q].incorrect_answers[0]),
    wrong2: replaceQuote(aRound.results[q].incorrect_answers[1]),
    wrong3: replaceQuote(aRound.results[q].incorrect_answers[2]),
    random: Random,
  };

  return task;
}

//RPH - Remove extra quotes and commas
function replaceQuote(text){
  return text.replace(/&quot;/g, '').replace(/&#039/g, '').replace(/;/, '')
  .replace(/[.*+?^${}()|[\]\\]\//g, '\\$&');
}


  //Create New questions
  async function grabQuestions(){
  // https://opentdb.com/api.php?amount=10&category=11&type=multiple
  //{"author":"Linus Torvalds","quote":"Talk is cheap. Show me the code."}

  const response = await fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple')
  .then((response) => response.json())
  .then((data) => {
    console.log("0PARK:"+ data);
    console.log("1PARK:"+ data.results);
    console.log("2PARK:"+ data.results[0].question);
    console.log("3PARK:"+ data.results[0].correct_answer);
    console.log("4PARK:"+ data.results[0].incorrect_answers);
    console.log("5PARK:"+ data.results[0].incorrect_answers[0]);
    console.log("6PARK:"+ data.results[0].incorrect_answers[1]);
    console.log("7PARK:"+ data.results[0].incorrect_answers[2]);


    //roundNumber
    let q = data.results[0].question;
    q.toString().replace("&quot;", "")
    setQuestion(q);
    //setQuestion(data.results[0].question);
    //setCorrectAnswer(data.results[0].correct_answer);
    setWrongOption1(data.results[0].incorrect_answers[0]);
    setWrongOption2(data.results[0].incorrect_answers[1]);
    setWrongOption3(data.results[0].incorrect_answers[2]);

    let Random = Math.floor(Math.random() * 4)
    console.log("Random"+Random);
  })

  console.log("QUOTE:"+ questions);
}


//Choose what port to use 
const httpService = app.listen(port, function() {
  //alert coder of what port is in use
  console.log(`Port ${port} is now being used`);
});

//RPH - Run peerGroup
peerGroup(httpService);
