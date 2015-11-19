app.factory('main', function(MainResource, $http, $q){
    return{
        createAd : function(ad){
            var deferred = $q.defer();
            var ad = new MainResource(ad);
            ad.$save().then(function(){
                deferred.resolve();
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
});