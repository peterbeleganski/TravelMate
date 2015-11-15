app.factory('identity',function($window, UsersResource){
    var user;
    if($window.bootstrappedUserObject) {
        user = new UsersResource();
        angular.extend(user,$window.bootstrappedUserObject);
    }

    return {
        currUser :user ,
        isAuthenticated : function(){
            return !!this.currUser;
        },
        isAuthorizedForRole: function(role) {
            return !!this.currUser && this.currUser.roles.indexOf(role) > -1;
        }
    }
});