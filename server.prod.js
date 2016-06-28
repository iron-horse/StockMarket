'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


/* Gather input from node command line params */
var stockType = process.argv[2];
var investorGroup = process.argv[3];


var myMarket = require('./createMarket')(stockType, investorGroup);

require('./routes')(app, myMarket);

/* Starting the Express.js server instance */
app.use(express.static('./dist'));
app.use(express.static('node_modules'));

app.listen(5000, function () {
  console.log('Stock Market Prod Server is now listening on port 5000!');
});