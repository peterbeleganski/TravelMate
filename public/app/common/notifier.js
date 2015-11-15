app.factory('notifier',function(toastr){
    return {
        success : function(msg){
            toastr.success(msg);
        },
        err : function(msg){
            toastr.error(msg);
        },
        warning: function(msg){
            toastr.warning(msg);
        }
    }
});