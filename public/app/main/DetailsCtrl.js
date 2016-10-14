app.controller('DetailsCtrl', function($scope, $routeParams, MainResource, identity, $http, sharedUserId, notifier){
    $scope.userId = "nqma id";
    $scope.adComments = [];
    $scope.ad = MainResource.get({id : $routeParams.id}, function(response){
        $scope.userId = response.user_id;
        getImg();
        $scope.adAsObject = response;
        console.log($scope.adAsObject);
        increaseVisited($scope.adAsObject._id);

    });

    $scope.user = identity.currUser;

    $scope.km=0.0;

    $scope.image = "https://www.plexusmd.com/PlexusMDAPI//Images/ProfilePicture/default_profile.jpg";
    $scope.showBinary = true;
    $scope.showByteImage = function(){

    };
    $scope.showUserImg = function(){
       // console.log(userId);
       // console.log(identity.currUser._id);
        getImg($scope.userId);
        return true;

    };

    var increaseVisited = function(id){
        $http.post("/api/increase/" + id)
            .then(function(response){
                //console.log("Success");
                //console.log(response.data.ad)
                $scope.ad = response.data.ad;
            })
    };

    var getImg = function(){
        $http.get("/api/img/" + $scope.userId)
            .then(function(response) {
                //console.log(response);
                if(response.data.data == "no image"){
                    $scope.showBinary = false;
                }
                $scope.user.image = response.data.data;
        });
    };
    $scope.postCmt = function(cmt, ad){
        //console.log(ad.username);
        //console.log(identity.currUser);
        var data = JSON.stringify(
            {
                comment:cmt,
                ad_id:ad._id,
                username:identity.currUser.username,
                user_id:identity.currUser._id
            }
        );
        var res = $http.post('/api/ads/comment', data);
        res.success(function(data, status, headers, config) {
            console.log(data);
            $scope.ad = data;
            notifier.success("New Comment posted!");
        });
    }



});
