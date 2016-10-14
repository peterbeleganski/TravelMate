var passport = require('passport'),
    auth = require('./auth'),
    controllers = require('../controllers'),
    mongoose = require('mongoose');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var User = mongoose.model('User');
module.exports = function(app){

    app.get('/api/users', controllers.users.getAllUsers);
    app.get('/api/users/:id', controllers.users.getUserById);

    app.post('/api/users',controllers.users.createUser);
    app.put('/api/users',auth.authenticate, controllers.users.updateUser);
    app.post('/api/editPhoto', multipartMiddleware, controllers.users.updatePhoto);

    app.get("/partials/:partialArea/:partialName",function(req,res){
        res.render('../../public/app/'+req.params.partialArea+'/'+ req.params.partialName);
        res.end();
    });

    app.get('/api/ads', controllers.ads.getAllAds);
    app.get('/api/ads/:id', controllers.ads.getAdById);
    app.post('/api/ads', controllers.ads.createAd);
    app.post('/api/ads/comment', controllers.ads.createCommentForAd);
    app.post('/api/increase/:id', controllers.ads.increaseVisited);
    app.delete('/api/ads/:id', controllers.ads.deleteAd);

    app.get('/api/img/:id', function(req,res, next){
        User.findById({_id:req.params.id}, function (err, doc) {
            if (err) return next(err);
            //res.contentType(doc.img.contentType);
            //console.log(doc.img);
            //console.log((doc.img.contentType));

                if( undefined === doc.img.contentType){
                    res.send({data:"no image"})
                }else{
                    //console.log(doc.img);
                    var base64 = (doc.img.data.toString('base64'));
                    res.send({data:base64});
                    // res.send(doc.img.data);
                }


        });
    });
    app.get('/api/*', function(req,res){
        res.status(404);
        res.end();
    });
    app.get('/',function(req,res){
        res.render('index',{currentUser:req.user});
        res.end();
        return
    });

    app.post('/login',auth.login);
    app.post('/logout', auth.logout);
};
