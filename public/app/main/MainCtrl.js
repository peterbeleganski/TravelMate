app.controller('MainCtrl',function($scope, MainResource, $location, identity, main, notifier){
    $scope.pesho = "232131321";
    $scope.identity = identity;
    $scope.ads = MainResource.query();
    $scope.img = "https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/14/149/149234/user-2-f.jpg?1406304852";
    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.size = $scope.ads.length;
    $scope.dateNow = Date.now();
    $scope.logAd = function(ad){
        $location.path('/adverts/view/details/' + ad._id);
    };

    $scope.goToAds = function(){
        $location.path('/ads');
    };

    $scope.deleteAd = function(ad) {
        console.log(ad);
        main.deleteAd(ad).then(function(){
            notifier.success("Ad deleted successfully!");
        })
    };

    $scope.validateDates = function(adDate){
        var dt = new Date(adDate);

        if(dt < Date.now()){
            return true;
        }else {
            return false;
        }
    };
});