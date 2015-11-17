app.controller('UserDetailsCtrl', function($scope, $routeParams, UsersResource){
    $scope.user = UsersResource.get({id : $routeParams.id});

    $scope.img = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";

});