var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var AdSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        default:''
    },
    seats: {
        type: Number,
        default: 1
    },
    requestedPeople:[{
        username:String,
        user_id : String
    }],
    date:{
        type:Date,
        default:Date.now(),
        required:true
    },
    description:{
        type:String
    },
    travelTo:{
        type:String,
        required:true,
        default:''
    },
    travelFrom:{
        type:String,
        required:true,
        default:''
    },
    user:{
        type:String,
        require:true,
        default:"unknown user"
    },
    user_id:String
});

var Ad = mongoose.model('Ad',AdSchema);

module.exports.seedInitialAds = function(){
    Ad.find({}).exec(function(err,collection){
        if(err){
            console.log(err);
            return;
        }
        if(collection.length === 0){

            var user = new User({
                username: 'keksa',
                firstName: 'Keksa',
                lastName: 'Keksov',
                phone: "08935277",
                currentPlace: "Plovdiv",
                email:'keksa@gmail.com'
            });
            user.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }

                var ad = new Ad({
                    title:"Monday adventures!",
                    seats : 2,
                    date:Date.now(),
                    description:"I am travelling to Plovdiv from Sofia if someone is interested contact with me :)",
                    travelTo:"Sofia",
                    travelFrom:"Plovdiv",
                    user:user.username,
                    user_id:user._id
                });

                ad.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    user.ads.push({ad_id:ad._id,ad_title:ad.title});
                    User.update({_id:user._id},user,function(){
                        console.log("user updated succesfuly")
                    });
                    console.log("Everything is fine")
                })
            });
            console.log('Ads added to database..');
        };
    });
};