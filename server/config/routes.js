var passport = require('passport'),
    auth = require('./auth'),
    controllers = require('../controllers'),
    mongoose = require('mongoose');

var User = mongoose.model('User');
module.exports = function(app){

    app.get('/api/users', controllers.users.getAllUsers);

    app.post('/api/users',controllers.users.createUser);
    app.put('/api/users',auth.authenticate, controllers.users.updateUser);

    app.get('/api/ads', controllers.ads.getAllAds);

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
}
