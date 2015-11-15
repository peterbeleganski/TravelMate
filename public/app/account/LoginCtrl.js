app.controller('LoginCtrl',function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;
    $scope.signin = function(){
        var user = {
            username: $scope.username,
            password: $scope.password
        };
        console.log(user);
        auth.login(user).then(function(success){
            if(success){
                notifier.success("Successful login");
                $location.path('/ads')
            }else{
                notifier.err("Username or Password not valid");
            }
        });
    };
    $scope.logout = function(){
        auth.logout().then(function(){
            notifier.success("Successful log out!");
            if($scope.username !== undefined && $scope.password !== undefined){
                $scope.username = '';
                $scope.password = '';
            }
            $location.path('/');
        });
    };

});

