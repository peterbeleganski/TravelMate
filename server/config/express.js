var express = require('express'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser');

module.exports = function(app,config){

    app.set('view engine','jade');
    app.set('views',config.development.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret:'shopska salata',resave:true,saveUninitialized:true}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.production.rootPath + '/public'));

};