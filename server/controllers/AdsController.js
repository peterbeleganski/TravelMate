var Ad = require('mongoose').model('Ad');
var User = require('mongoose').model('User');

module.exports = {
    getAdById : function (req,res,next) {
        Ad.findOne({_id: req.params.id}).exec(function(err, ad){
            if(err){
                console.log(err);
                return;
            }
            res.send(ad);
        });
    },
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
                console.log("Error from create newAdd");
                console.log(err);
                return;
            }

            console.log("Ready to insert the add");
            res.status(200);
            res.end();
        });

    },
    createCommentForAd: function(req,res,next){
        var commentData = req.body;

        console.log(commentData);
        //console.log(newAdd);

        Ad.findOne({_id: commentData.ad_id}).exec(function(err, ad){
            if(err){
                console.log(err);
                return;
            }
            var cmt = {
                user_id : commentData.user_id,
                username:commentData.username,
                body:commentData.comment
            };
            ad.comments.push(cmt);
            ad.save();
            res.send(ad);
        });

    },
    deleteAd : function(req,res,next){
        console.log(req.params);
        var adId = req.params.id;

        Ad.remove({ _id: adId }, function(err,collection) {
            if (err) {
                return next(err);
            }
            else {
                console.log("deleted");
                res.send(collection);
            }
        });
    },
    increaseVisited: function(req, res, next){
        //console.log(req.params);
        var adId = req.params.id;
        var adData = {};
        Ad.findOne({_id: adId}).exec(function(err, ad){
            if(err){
                console.log(err);
                return;
            }
            var currVisited = ad.visited;
            ad.visited = currVisited + 1;
            Ad.update({_id:adId},ad,function(){
                res.send({ad:ad});
                res.end();
            });
        });
    }
};
