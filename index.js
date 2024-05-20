// Dependencies
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool for Node.js
const cors = require('cors'); // Cross Origin Resource Sharing
const path = require('path'); // Utility for working with files and directory paths
const passport = require('passport'); 
const moment = require('moment'); // Dates and time
const expressSession = require("express-session")({
  secret:"secret",
  resave:false,
  saveUninitialized:false
})

require('dotenv').config(); // Loads envt varibales from .env file

// Import register model with user details
const AdminRegister = require('./models/AdminRegister');

// Import routes
const registrationRoutes = require('./routes/registrationRoutes')
const authenticationRoutes = require('./routes/authenticationRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')

// Instantiations
const app = express(); // Creating an instance of the express application

// Configurations // Connects to MongoDB using the DATABASE environment variable in .env file
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection
    .once('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', err => {
      console.error(`Connection error: ${err.message}`);
   });

app.locals.moment = moment; // Make moment available in views     
app.set('view engine', 'pug'); // Set pug as the view engine
app.set('views', path.join(__dirname, 'views')); // Set directory for storing view templates

// Middleware
app.use(express.static(path.join(__dirname, "public"))) // Set directory for static files
app.use('/public/images/uploads', express.static(__dirname +'/public/images/uploads'))
app.use(express.urlencoded({extended:true})); // Parsing incoming req bodies in URL encoded format
app.use(express.json()); // Parsing incoming req bodies in JSON format
app.use(cors()); // Allow reqs from different origins

// Express session configurations
app.use(expressSession); // Express session mgt
app.use(passport.initialize()); // Authentication
app.use(passport.session()); // Login session mgt

// Passport configurations //User authentication
passport.use(AdminRegister.createStrategy());
passport.serializeUser(AdminRegister.serializeUser());
passport.deserializeUser(AdminRegister.deserializeUser());

// Use imported routes
app.use("/", registrationRoutes);
app.use("/", authenticationRoutes);
app.use("/", purchaseRoutes);

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

// Boostrapping the server
app.listen(3000, () => console.log('listening on port 3000'));