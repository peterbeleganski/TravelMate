app.factory('auth',function($q, $http, identity, UsersResource){
    return {
        update: function(user){
            var deferred = $q.defer();
            var updatedUser = new UsersResource(user);
            updatedUser._id = identity.currUser._id;
            identity.currUser.firstName = updatedUser.firstName;
            identity.currUser.lastName = updatedUser.lastName;
            updatedUser.$update().then(function(){
                deferred.resolve();
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        },
        signUp: function(user){
            var deferred = $q.defer();
            var user = new UsersResource(user);
            user.$save().then(function(){
                identity.currUser = user;
                deferred.resolve()
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        },
        login : function(user){
            var deferred = $q.defer();
            $http.post('/login',user).success(function(response){
                if(response.success){
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.currUser = user;
                    deferred.resolve(true);
                }else{
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },
        logout: function(){
            var deferred = $q.defer();
            $http.post('/logout').success(function(){
                identity.currUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        },
        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function(role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
});