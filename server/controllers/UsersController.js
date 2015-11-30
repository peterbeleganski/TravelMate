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
        var targetPath = path.join(__dirname, "../../public/img/" + userId + file.name);
        var savePath = "/img/" + userId + file.name;

        fs.rename(tempPath, targetPath, function (err){
            if (err){
                console.log(err)
            } else {
                User.findById(userId, function(err, userData){
                    var user = userData;
                    user.image = savePath;
                    user.save(function(err){
                        if (err){
                            console.log("failed save");
                            res.json({status: 500})
                        } else {
                            console.log("save successful");
                            res.json(user);
                        }
                    })
                })
            }
        })
    }
};







