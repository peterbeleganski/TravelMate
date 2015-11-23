app.controller('CreateAdCtrl', function($scope, identity, main, notifier, $location){
   $scope.test = "Create ad view!";

   $scope.createAd = function(ad){
      console.log(ad);
      console.log(identity.currUser);

      var data = ad;
      data.user = identity.currUser;

      /*main.createAd(data).then(function(success){
         if(success){
            notifier.success("Posted!");
            $location.path('/ads')
         }else{
            notifier.err("Oops, you suck!");
         }
      });
      */
      main.createAd(data).then(function(){
         notifier.success("Ad created successful!");
         $location.path('/ads');
      });
   };

   $scope.goToHome = function(){
      $location.path('/');
   }

});