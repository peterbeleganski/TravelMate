app.controller('UserDetailsCtrl', function($scope, $routeParams, UsersResource, $http){
    $scope.user = UsersResource.get({id : $routeParams.id});

    $scope.img = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";

    $scope.image = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";
    $scope.user.image = "no image";
    $scope.showByteImage = function(){
        if($scope.user.image === 'no image'){
            return true;
        }else{
            return false;
        }
    };
    var getImg = function(){
        $http.get("/api/img/" + $routeParams.id)
            .then(function(response) {
                console.log(response);
                $scope.user.image = response.data.data;
            });
    };
    getImg();
});