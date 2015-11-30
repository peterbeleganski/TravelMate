app.controller('DetailsCtrl', function($scope, $routeParams, MainResource){
    $scope.ad = MainResource.get({id : $routeParams.id});

    $scope.km=0.0;
    this.myFunc = function() {
        $scope.km = this.directions.routes[0].legs[0].distance.text;
    };

});