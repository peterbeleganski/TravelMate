app.controller('CreateAdCtrl', function($scope, identity, main, notifier, $location){
   $scope.test = "Create ad view!";


   $scope.create = function(ad){
      var data = ad;
      data.user = identity.currUser;

      main.createAd(data).then(function(){

         notifier.success("Ad created successful!");
         $location.path('/ads');
      });
   };
   $scope.goToHome = function(){
      $location.path('/');
   }

});