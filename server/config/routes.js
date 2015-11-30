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

    app.get('/api/ads', controllers.ads.getAllAds);
    app.get('/api/ads/:id', controllers.ads.getAdById);
    app.post('/api/ads', controllers.ads.createAd);


    app.get("/partials/:partialArea/:partialName",function(req,res){
        res.render('../../public/app/'+req.params.partialArea+'/'+ req.params.partialName);
    });


    app.get('/api/*', function(req,res){
        res.status(404);
        res.end();
    });
    app.get('*',function(req,res){
        res.render('index',{currentUser:req.user});
    });

    app.post('/login',auth.login);
    app.post('/logout', auth.logout);
};
