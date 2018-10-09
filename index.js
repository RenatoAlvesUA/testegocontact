const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
var cors = require('cors');
var http = require('http');

const path = require('path');
var enforce = require('express-sslify');

const app = express();
//EDITED
//app.use(enforce.HTTPS({ trustProtoHeader: true }))

//mongoose.connect('mongodb://localhost:27017/Portucalia');
//mongoose.connect('mongodb://heroku_5ks1llw6:rtu2s9e1erllfb5sl1tudovoea@ds159840.mlab.com:59840/heroku_5ks1llw6');
//mongoose.connect('mongodb://renatoalves:renato94@ds159840.mlab.com:59840/heroku_5ks1llw6');

mongoose.Promise = global.Promise;

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API routes
require('./routes/index')(app);




///////////////////////////////
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
//http.createServer(app).listen(port)
console.log(`Password generator listening on ${port}`);