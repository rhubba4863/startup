/**
 * Week 9-10 Athentication
 */
 

//Express Tools
const express = require('express');
const app = express();

//allow your code to select a port to run on based on the command line parameters.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//Express static middleware to serve files from the public directory once your 
// code has been deployed to your AWS server.
// Serve up the front-end static content hosting
app.use(express.static('public'));
app.use(express.json());



/**
 * Endpoint Ideas
 * 1) Create User
 * 2) Checkout user info
 * 3) Login User
 * 4) Logout User
 * 5) Add new score
 * 6) Return all scores (or maybe just top 10???)
 */

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


//Choose what port to use

//alert coder of what port is in use
//app.listen(port);
app.listen(port, function() {
  console.log(`Port ${port} is now being used`);
});
