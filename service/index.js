/**
 * Week 9-10 Athentication
 */
 



//allow your code to select a port to run on based on the command line parameters.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//Express static middleware to serve files from the public directory once your 
// code has been deployed to your AWS server.
// Serve up the front-end static content hosting
app.use(express.static('public'));


