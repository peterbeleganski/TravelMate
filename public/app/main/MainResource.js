app.factory('MainResource',function($resource){
    var MainResource = $resource('/api/ads/:id',{_id:'@id'}, {update: {method:'PUT', isArray:false}});

    return MainResource;
});
