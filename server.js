var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var cors = require('cors');
//use express
var app = express();
var port = 3000;

//bind the server to a port
app.listen(port, () => {
    console.log("Server started at port: "+port);
});

app.use(cors());

//bodyparser to parse the json data
app.use(bodyparser.json());

//all routes would be in a separate file, require the routes
var route = require('./routes/route');
//all api calls to the respective routes would be directed to the route file
app.use('/api',route);

app.get('/',function(req,res){
    res.send("Home Page");
});