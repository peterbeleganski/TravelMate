app.controller('CreateAdCtrl', function($scope, identity, main, notifier){
   $scope.test = "Create ad view!";

   $scope.createAd = function(ad){
      console.log(ad);
      console.log(identity.currUser);

      var data = ad;
      data.user = identity.currUser;

      main.createAd(data).then(function(success){
         if(success){
            notifier.success("Posted!");
            $location.path('/ads')
         }else{
            notifier.err("Oops, you suck!");
         }
      });
   }

});