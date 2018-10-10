const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const app = express();



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