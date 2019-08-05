//adapted from Liam McCabe's code (NCI HDWT 2018) and using information found in https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//mongodb connection: mongodb+srv://margaretadmin:egan2019@cluster0-uuohe.mongodb.net/ssapp?retryWrites=true&w=majority
//finally connected up mongoose,mongodb atlas and node.js with stackexchange queries and https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656211-set-up-your-database


var express = require("express"); // Call express  
const bodyParser = require("body-parser");
const path = require('path');
const VIEWS = path.join(__dirname, 'views');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'pug');

app.use(express.static("scripts")); // allow the application to access the scripts folder contents to use in the application
app.use(express.static("images")); // allow the application to access the images folder contents to use in the application
app.use(express.static("models"));

//Bring in models
var User = require("./models/user.js");
var Plant = require("./models/plant.js");
var Comment = require("./models/comment.js");

//connect to mongodb
const mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://margaretadmin:egan2019@cluster0-uuohe.mongodb.net/ssapp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
//get the default connection
var db = mongoose.connection;
//Bind connection to error event - used developer syntax rather than Liam's to make it work
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// *************
//Data 

// include the user model
var User = require("./models/user.js");

// create a new user 
//let newUser = new User({
//  username: 'demo',
//  email: 'demo@demo.com',
//  password: '1234',
//  location: 'Cavan'
//});
//
// save the user
//newUser.save(function(err) {
//  if (err) throw err;
 // console.log('User created successfully.');
//});

//create a new plant 
 //let newPlant = new Plant({
   // plantname: 'Orchid',
   //latinname: 'Orchidae',
   // category: 'Offer',
   // plantdetails: 'Two purple orchids looking for a home',
   // plantimage: 'https://cdn.pixabay.com/photo/2018/02/27/04/33/orchids-3184680_960_720.jpg',
   //location: 'Rivonia',
   // postedby: '5d487cf98171f7605588f2a8',
 //});
// save the plant
//newPlant.save(function(err) {
 //if (err) throw err;
//  console.log('Plant created successfully.');
//});


// *************
//Routes 

// function to render the home page
app.get('/', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('index.pug', {root: VIEWS});
  console.log("Live long and prosper!");
});

// function to render the contact page
app.get('/contact.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('contact.pug', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the contact us page!");
});

// function to render the forum page
app.get('/forum.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('forum.pug', {root: VIEWS}); // use the rssender command so that the response object renders a HHTML page
  console.log("Now you are on the forum page!");
});


//pages requiring functions

// function to render the catalogue page
app.get('/catalogue.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
 
 
  res.render('catalogue.pug', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the catalogue page!");
});



// function to render the plant page
app.get('/plant.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('plant.pug', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the plant page!");
});

//app.get('/document/:id', function(req, res) {

//  Document.findOne({ _id : req.params.id }, function(error, document) {
//    if (error || !document) {
//      res.render('error', {});
 //  } else {

//      res.render('document', { document : document });
//    }
//  });
//});


// function to render the add to catalogue page
app.get('/addplant.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('addplant.pug', {root: VIEWS}); // use the rssender command so that the response object renders a HHTML page
  console.log("Now you are on the add to catalogue page!");
});

// post request to add plant

app.post('/addplant', function(req, res){
    var plant = {
		plantname: req.body.plantname, // name called from the addplant.pug page textbox
		latinname: req.body.latinname,
		category: req.body.category,
		plantdetails: req.body.plantdetails,
		plantimage: req.body.plantimage,
		location: req.body.location,
		username: req.body.username,

	};
    
    console.log(req.body);
    res.redirect('/');
});


// function to render the register page for creating the object
app.get('/register', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('register', {root: VIEWS});
  console.log("Live long and prosper!");
});


//create user from form, saving the information and redirecting 
app.post('/register/add', function(req, res){
    let newUser = User({
		username: req.body.username, // name called from the register.pug page textbox
		email: req.body.email,
		password: req.body.password,
		location: req.body.location,
	});
	newUser.save(function(err){
        if(err){
         throw(err);
        } else {
            console.log('Your data has been saved');
        }
});
   res.redirect('/');
});


// function to render the login page
app.get('/login.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('login.pug', {root: VIEWS});
  console.log("Live long and prosper!");
});

//not needed add button!!!!!
// function to render the logout page
app.get('/register.pug', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('register.pug', {root: VIEWS});
  console.log("Live long and prosper!");
});



// *************
// server

app.get('/', function(req, res) {
    res.send("Hello World");
    console.log("Hello World"); 
});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is live!");
});

    