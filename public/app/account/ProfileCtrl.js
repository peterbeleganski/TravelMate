app.controller('ProfileCtrl', function($scope, identity, $location, notifier, auth){
    $scope.user = identity.currUser;

    $scope.GoToAds = function(){
        $location.path('/ads');
    };


    $scope.updateLog = function(){
        console.log($scope.user);
    };

    $scope.update = function(user){
        auth.update(user).then(function(){
            $scope.user = user;
            notifier.success("Profile updated!");
            $location.path('/');
        });
    }
});