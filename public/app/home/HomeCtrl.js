app.controller('HomeCtrl', function($scope, notifier, $location, shared) {
    $scope.name = "pesho";


    $scope.ads = [
        {
            user:"Unknown user",
            travelTo:"Sofia",
            img:"https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/14/149/149234/user-2-f.jpg?1406304852",
            travelFrom:"Plovdiv",
            seatsLeft: 3,
            date:Date.now(),
            phone:"03912321323",
            email:"user@eemail.com"
        }
    ];

    $scope.buyLaptop = function(laptop){
        console.log(laptop);
        shared.setProperty(laptop);
        $location.path('/view')
    }

    $scope.laptopDetails = shared.getProperty();

    $scope.backToGallery = function(){
       $location.path('/ads');
    }

});