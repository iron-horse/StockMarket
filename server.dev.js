'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json

/* Gather input from node command line params */
var stockType = process.argv[2];
var investorGroup = process.argv[3];

var myMarket = require('./createMarket')(stockType, investorGroup);

// TODO: Use routers
require('./routes')(app, myMarket);

/* Starting the Express.js server instance */
app.use(express.static('src'));
app.use(express.static('checking'));
app.use(express.static('node_modules'));


app.listen(3000, function () {
  console.log('Stock Market Dev Server is now listening on port 3000!');
});