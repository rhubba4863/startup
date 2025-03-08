/**
 * Week 9-10 Athentication
 */

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

const authCookieName = 'token';

// JSON body parsing using built-in middleware
app.use(express.json());
// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

//Save Users and the scores 
// (Note - They will delete from system when the service is restarted.)
let users = [];
let scores = [];

// Allow your code to select a port to run on based on the command line parameters.
// The service port. In production the front-end code is statically hosted by 
// the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

/**
 * Express static middleware to serve files from the public directory once your 
 * code has been deployed to your AWS server.
 */
// Serve up the front-end static content hosting
app.use(express.static('public'));
// JSON body parsing using built-in middleware
app.use(express.json()); 

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


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
 * Log onto an existing user
 */
apiRouter.put('/auth/login', async (req, res) => {
  console.log("6------------------");
  const user = await findUser('userName', req.body.userName);
  console.log("------------------"+user);

  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ userName: user.userName });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

/**
 * Log off of user
 */
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({ userName: user.userName });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function getUser(field, value) {
  // if (value) {
  //   return users.find((user) => user[field] === value);
  // }
  // return null;

  if (!value) return null;

  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}

//Choose what port to use 
//app.listen(port);
app.listen(port, function() {
  //alert coder of what port is in use
  console.log(`Port ${port} is now being used`);
});
