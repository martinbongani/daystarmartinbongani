// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();

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
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/home', (req, res) => {
    res.send ('Welcome to Daystar Daycare Center!');
});

app.get('/about', (req, res) => {
    res.send ('This is the About page of Daystar Daycare Center');
});








// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

// Boostrapping the server
app.listen(3000, () => console.log('listening on port 3000'));