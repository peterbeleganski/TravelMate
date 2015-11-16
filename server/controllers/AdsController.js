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
    createAdd: function(req,res,next){
        var adData = req.body;

        Ad.create(adData,function(err,ad){
            if(err){
                console.log(err);
                return;
            }
            res.send(ad);
        });
    }
};