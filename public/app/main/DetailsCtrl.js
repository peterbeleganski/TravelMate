app.controller('DetailsCtrl', function($scope, $routeParams, MainResource){
    $scope.ad = MainResource.get({id : $routeParams.id});
    console.log($scope.ad);
});