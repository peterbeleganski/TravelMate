var Ad = require('mongoose').model('Ad');

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
        console.log(adData);
        return;
        Ad.create(adData,function(err,ad){
            if(err){
                console.log(err);
                return;
            }
            res.send(ad);
        });
    }
};