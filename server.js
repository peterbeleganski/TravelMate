var express = require('express');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];
io.on('connection', function(socket) {
   var username = '';
   console.log("A User has Connected!");

   socket.on('request-users', function(){
      socket.emit('users', {users: users});
   });

   socket.on('message', function(data){
      io.emit('message', {username: username, message: data.message});
   });

   socket.on('add-user', function(data){
      if(users.indexOf(data.username) == -1){
         io.emit('add-user', {
            username: data.username
         });
         username = data.username;
         users.push(data.username);
      } else {
         socket.emit('prompt-username', {
            message: 'User Already Exists'
         })
      }
   });

   socket.on('disconnect', function(){
      console.log(username + ' has disconnected!');
      users.splice(users.indexOf(username), 1);
      io.emit('remove-user', {username: username});
   })
});


var config = require('./server/config/config');
require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

var port = config.development.port;
http.listen(port);

console.log("Server is running on port: "+port);