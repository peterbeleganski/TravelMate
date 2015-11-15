app.controller('ProfileCtrl', function($scope, identity, $location){
    $scope.user = identity.currUser;

    $scope.GoToAds = function(){
        $location.path('/ads');
    }
});