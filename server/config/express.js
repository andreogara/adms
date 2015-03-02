var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require("cookie-parser");
module.exports = function(app, config, path){
	function compile(str, path){
		return stylus(str).set('filename', path);
	}
	// view engine setup
	app.set('views', path.join(config.rootPath, '/server/views'));
	console.log(path.join(config.rootPath, '/server/views'));
	app.set('view engine', 'jade'); 
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(stylus.middleware(
	{
		src: config.rootPath + '/public',
		compile: compile
	}
	));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(config.rootPath, '/public')));
	console.log(path.join(config.rootPath, '/public'));
}
