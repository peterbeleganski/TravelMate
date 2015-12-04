app.controller('DetailsCtrl', function($scope, $routeParams, MainResource, identity, $http, sharedUserId){
    $scope.ad = MainResource.get({id : $routeParams.id});
    $scope.user = identity.currUser;
    $scope.km=0.0;
    this.myFunc = function() {
        $scope.km = this.directions.routes[0].legs[0].distance.text;
    };
    $scope.image = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";
    $scope.user.image = "no image";
    $scope.showByteImage = function(){
        if($scope.user.image === 'no image'){
            return false;
        }else{
            return true;
        }
    };
    $scope.showUserImg = function(userId){
        console.log(userId);
        console.log(identity.currUser._id);
        getImg(userId);
    };
    var getImg = function(id){

        $http.get("/api/img/" + id)
            .then(function(response) {
                console.log(response);
                $scope.user.image = response.data.data;
        });
    };


});