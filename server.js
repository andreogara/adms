var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config, path);
var db = require('./server/config/mongoose')(config);
require('./server/config/routes')(app, db);

	
app.listen(config.port);
console.log("server running on port "+config.port+"...");