app.controller('GalleryCtrl', function ($scope) {
    $scope.myInterval = 4500;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '/img/image2.jpg',
            text:'Portable design'
        });
        slides.push({
            image: '/img/image3.jpg'
        });
        slides.push({
            image: '/img/image4.jpg'
        });
        slides.push({
            image: '/img/image5.png'
        });
    };

    $scope.addSlide();
});