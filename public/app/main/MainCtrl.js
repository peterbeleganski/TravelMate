app.controller('MainCtrl',function($scope, MainResource){
    $scope.pesho = "232131321";

    $scope.ads = MainResource.query();

    $scope.img = "https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/14/149/149234/user-2-f.jpg?1406304852";

});