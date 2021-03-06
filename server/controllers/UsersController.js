var User = require('mongoose').model('User');
var encrypt = require('../utilities/encrypt');
var fs = require('fs-extra');
var path = require('path');

module.exports = {
    getAllUsers: function(req,res){
        User.find({}).exec(function(err,collection){
            if(err){
                console.log(err);
                return;
            }
            res.send(collection);
        });
    },
    getUserById : function (req,res,next) {
        User.findOne({_id: req.params.id}).exec(function(err, user){
            if(err){
                console.log(err);
                return;
            }
            res.send(user);
        });
    },
    createUser: function(req,res,next){
        var userData = req.body;
        userData.salt = encrypt.generateSalt();
        userData.hashPass = encrypt.generateHashedPassword(userData.salt,userData.password);
        User.create(userData,function(err,user){
            if(err){
                console.log(err);

                return;
            }
            req.logIn(user,function(err){
                if(err){
                    return next(err);
                }
                res.send(user);
            })
        });
    },
    updateUser: function(req,res){
        if(req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1){
            var updatedUserData = req.body;
            if(updatedUserData.password && updatedUserData.password.length > 0){
                updatedUserData.salt = encrypt.generateSalt();
                updatedUserData.hashPass = encrypt.generateHashedPassword(updatedUserData.salt,updatedUserData.password);
            }
            User.update({_id:req.body._id},updatedUserData,function(){
                res.end();
            });
        }else{
            res.send({reason:'Because!'});
        }
    },
    updatePhoto: function(req,res){
        var file = req.files.file;
        var userId = req.body.userId;

        console.log("User " + userId + " is submitting " , file);

        var tempPath = file.path;

        User.findOne({_id:userId}).exec(function(err, user){
            if(err){
                console.log(err);
                return;
            }
            user.img.data =  fs.readFileSync(tempPath);
            user.img.contentType = file.type;
            user.save(function(err, data){
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Image saved to database:");
               // console.log(data);
                res.send(data);
            });
        });
    }
};







