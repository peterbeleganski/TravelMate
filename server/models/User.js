var mongoose = require('mongoose');
var encryption = require('../utilities/encrypt');
var fs = require('fs');
var path = require('path');
var Schema = mongoose.Schema;

var userSchema =  mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email:{type:String, default:"user@email.com"},
    salt : String,
    hashPass : String,
    firstName : {type:String, required:false},
    lastName : {type:String, required:false},
    roles:[String],
    phone:{type:String, default:"089832151"},
    registeredDate:{type:Date, default:Date.now()},
    currentPlace:{type:String, default:"Bulgaria"},
    ads:[{
        tile:String,
        seats: String,
        date:Date,
        description:String,
        travelTo:{
            type:String,
            required:true,
            default:''
        },
        travelFrom:{
            type:String,
            required:true,
            default:''
        }
    }],
    img: {
        data: Buffer,
        contentType: String
    }
});


userSchema.method({
    authenticate:function(password){
        if(encryption.generateHashedPassword(this.salt,password) === this.hashPass){
            return true;
        }else{
            return false;
        }
    }
});

var User = mongoose.model('User',userSchema);


module.exports.seedInitialUsers = function(){
    User.find({}).exec(function(err,collection){
        if(err){
            console.log(err);
            return;
        }
        if(collection.length === 0 ){
            var salt;
            var hashedPwd;
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt,'pepi');
            var targetPath = path.join(__dirname, "../../public/img/js1.png");
            var user = new User;
            user.username = "test";
            user.firstName ='test';
            user.lastName = "test";
            user.salt = salt;
            user.hashPass = hashedPwd;
            user.roles.push("admin");
            user.phone = "0898432688";
            user.currentPlace ="plovdiv";
            user.img.data = fs.readFileSync(targetPath);
            user.img.contentType = 'image/png';
            //User.create(user);
            user.save(function(err, data){
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Image saved to database:");
                console.log(data);
            });

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt,'pesho');
            User.create({username:'pesho',firstName:'pesho',lastName:'peshov',salt:salt,hashPass:hashedPwd, roles:['standard']});
            console.log('Users added to database..');
       };

    });
};
