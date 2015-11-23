app.factory('main', function(MainResource, $http, $q){
    return{
        createAd : function(ad){
            var deferred = $q.defer();
            var adToAdd = new MainResource(ad);
            adToAdd.$save().then(function(){
                deferred.resolve()
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }

    }
});