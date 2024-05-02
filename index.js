// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport')
const expressSession = require("express-session")({
  secret:"secret",
  resave:false,
  saveUninitialized:false
})

require('dotenv').config();

// Import register model with user details
const AdminRegister = require('./models/AdminRegister');
const BabyRegister = require('./models/BabyRegister');
const SitterRegister = require('./models/SitterRegister');

// Import routes
const registrationRoutes = require('./routes/registrationRoutes')
const authenticationRoutes = require('./routes/authenticationRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')

// Instantiations
const app = express();

// Configurations
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
  
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, "public"))) // Set directory for static files
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Express session configurations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Passport configurations
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