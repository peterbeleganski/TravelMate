app.controller('SignUpCtrl',function($scope, auth, $location, notifier){
    $scope.signUp = function(user){
        auth.signUp(user).then(function(){
            notifier.success("Account created successful!");
            $location.path('/');
        });
    }

    $scope.registerAccount = function(){
        var user = {
            email:$scope.email,
            username:$scope.username,
            password:$scope.password
        };
        auth.signUp(user).then(function(){
            notifier.success("Account created successful!");
            $location.path('/');
        });
    }
});