app.controller('ProfileCtrl', function($scope, identity){
    $scope.user = identity.currUser;
    $scope.name = "pesho";
});