app.controller('MainCtrl',function($scope, MainResource, $location){
    $scope.pesho = "232131321";

    $scope.ads = MainResource.query();
    $scope.img = "https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/14/149/149234/user-2-f.jpg?1406304852";

    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.size = $scope.ads.length;

    $scope.logAd = function(ad){
        $location.path('/ads/' + ad._id);
    }

    $scope.goToAds = function(){
        $location.path('/ads');
    }
});