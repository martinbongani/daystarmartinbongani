const express = require('express');
const app = express();

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