app.controller('ProfileCtrl', function($scope, identity, $location, notifier, auth, UsersResource, Upload, $http){
    $scope.user = identity.currUser;

    $scope.GoToAds = function(){
        $location.path('/ads');
    };


    $scope.updateLog = function(){
        console.log($scope.user);
    };

    $scope.update = function(user){
        auth.update(user).then(function(){
            $scope.user = user;
            notifier.success("Profile updated!");
        });
    };
    $scope.image = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";
    $scope.users = UsersResource.query();
    console.log($scope.users);

    $scope.$watch(function(){
        return $scope.file;
    }, function(){
        $scope.upload($scope.file);
    });

    $scope.showByteImage = function(){
        if($scope.user.image === 'no image'){
            return false;
        }else{
            return true;
        }
    };

    $scope.upload = function(file){
        if(file){
            Upload.upload({
                url:'/api/editPhoto',
                method:'POST',
                data :{
                    userId:$scope.user._id,
                    file:file
                }
            }).progress(function(evt) {
                console.log("Firing");
            }).success(function(data){
                notifier.success("Image uploaded!");
                getImg();
            }).error(function(err){
                console.log(err);
                $scope.image = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";
            })
        }
    };

    var getImg = function(){
        $http.get("/api/img/" + identity.currUser._id)
            .then(function(response) {
                console.log(response);
                $scope.user.image = response.data.data;
            });
    };

    getImg();
});