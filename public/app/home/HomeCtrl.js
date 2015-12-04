app.controller('HomeCtrl', function($scope, notifier, $location, shared, MainResource) {
    $scope.name = "pesho";

    $scope.ads = MainResource.query();

    $scope.laptopDetails = shared.getProperty();

    $scope.goToAds = function(){
       $location.path('/ads');
    };


        $scope.myInterval = 4500;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '/img/js1.png'
            });
            slides.push({
                image: '/img/js2.png'
            });
        };
        $scope.addSlide();

});