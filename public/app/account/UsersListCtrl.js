app.controller('UsersListCtrl', function($scope, UsersResource){
    $scope.users = UsersResource.query();
});