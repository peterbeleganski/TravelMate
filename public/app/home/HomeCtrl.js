app.controller('HomeCtrl', function($scope, notifier, $location, shared, MainResource) {
    $scope.name = "pesho";

    $scope.ads = MainResource.query();



    $scope.laptopDetails = shared.getProperty();

    $scope.goToAds = function(){
       $location.path('/ads');
    }

});