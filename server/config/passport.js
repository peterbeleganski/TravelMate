var passport = require('passport'),
    mongoose = require('mongoose'),
    userModel = require('../models/User'),
    User = require('mongoose').model("User");
var LocalPassport = require('passport-local');
module.exports = function(){
    passport.use(new LocalPassport(function(username,password,done){
        User.findOne({username:username}).exec(function(err,user){
            if(err){
                console.log('Error logging user: ' + err);
                return;
            }
            if(user && user.authenticate(password)){
                done(null,user);
            }else{
                done(null,false);
            }
        });
    }));

    passport.serializeUser(function(user,done){
        if(user){
            done(null,user._id);
        }
    });

    passport.deserializeUser(function(id,done){
        User.findOne({_id:id}).exec(function(err,user){
            if(err){
                console.log('Error logging user: ' + err);
                return;
            }
            if(user){
                done(null,user);
            }else{
                done(null,false);
            }
        });
    });
};