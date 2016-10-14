var mongoose = require('mongoose');
var user = require('../models/User');
var ad = require('../models/Ad');

module.exports = function(config){
    mongoose.connect(config.production.db);

    var db = mongoose.connection;
    db.once('open',function(err){

        if(err){
            console.log(err);
            return;
        }
        console.log('Database up and running...');
    });

    db.on('error',function(err){
        console.log(err);
    });
    user.seedInitialUsers();
    //course.seedInitialCourses();
    ad.seedInitialAds();
};






