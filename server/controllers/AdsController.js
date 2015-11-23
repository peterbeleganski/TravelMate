var Ad = require('mongoose').model('Ad');
var User = require('mongoose').model('User');

module.exports = {
    getAllAds: function(req,res){
        Ad.find({}).exec(function(err,collection){
            if(err){
                console.log(err);
                return;
            }
            res.send(collection);
        });
    },
    createAd: function(req,res,next){
        var adData = req.body;
        var newAdd = {
            title:adData.user._id + Date.now() + adData.date,
            requestedPeople:[],
            seats:adData.seats,
            description: adData.description,
            date:adData.date,
            travelTo:adData.travelTo,
            travelFrom:adData.travelFrom,
            user:adData.user.username,
            user_id:adData.user._id
        };
        //console.log(newAdd);
        Ad.create(newAdd,function(err,ad){
            if(err){
                console.log("Error from create newAdd")
                console.log(err);
                return;
            }

            User.findOne({_id:adData.user._id},function(err,user){
               if(err){
                   console.log("Error from user find");
                   console.log(err);
                   return;
               }

                console.log("Success:");

                var userAdd = newAdd;
                delete userAdd.user;
                delete  userAdd.user_id;
                delete  userAdd.requestedPeople;
                user.ads.push(userAdd);
                user.save();
            });
            console.log("Ready to insert the add");
            res.status(200);
            res.end();
        });

    }
};