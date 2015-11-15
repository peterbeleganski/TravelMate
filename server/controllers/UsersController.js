var User = require('mongoose').model('User');
var encrypt = require('../utilities/encrypt');

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
            })
        }else{
            res.send({reason:'Because!'});
        }
    }
};







