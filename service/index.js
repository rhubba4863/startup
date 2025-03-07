/**
 * Week 9-10 Athentication
 */

// //Express Tools
// const express = require('express');
// const app = express();

// //allow your code to select a port to run on based on the command line parameters.
// const port = process.argv.length > 2 ? process.argv[2] : 4000;

// //Express static middleware to serve files from the public directory once your 
// // code has been deployed to your AWS server.
// // Serve up the front-end static content hosting
// app.use(express.static('public'));
// // JSON body parsing using built-in middleware
// app.use(express.json()); 



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

/*
// 1) Create User
app.post('/api/auth', async (req, res) => {
  //res.send({ email: 'anothergraduate@id.com' });
  res.send(req.body);
});
// curl -X POST localhost:4000/api/auth -d '{"email":"test@id.com", "password":"a"}'
// curl -X POST localhost:4000/api/auth -H "Content-Type: application/json" -d '{"email":"test@id.com", "password":"a"}'


// 2) Checkout user info
app.get('/api/user', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

// 3) Login User
app.put('/api/auth', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

// 4) Logout User
app.delete('/api/auth', async (req, res) => {
  res.send({});
});
*/

/**
 * Encryption
 */
/*//Encruption to hash the password
const bcrypt = require('bcryptjs');

const users = [];

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
  };

  users.push(user);

  return user;
}

function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

//Choose what port to use 
//app.listen(port);
app.listen(port, function() {
  //alert coder of what port is in use
  console.log(`Port ${port} is now being used`);
});
*/

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cookieParser());

app.post('/api/auth', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user);

    res.send({ email: user.email });
  }
});

app.put('/api/auth', async (req, res) => {
  const user = await getUser('email', req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user);

    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    clearAuthCookie(res, user);
  }

  res.send({});
});

app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

const users = [];

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
  };

  users.push(user);

  return user;
}

async function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
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
