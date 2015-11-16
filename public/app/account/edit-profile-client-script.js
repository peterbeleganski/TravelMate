$(document).ready(function () {

    $(".buttonUpdate").click(function(){
        var password = $("#password");
        password.attr("disabled",false);
        $("#phone").attr("disabled",false);
        $("#email").attr("disabled",false);
        $("#current_place").attr("disabled",false);
        $("#last_name").attr("disabled",false);
        $("#first_name").attr("disabled",false);
        $("#username").attr("disabled",false);
    });

    $("#btnSave").click(function(){
        $(".form-group").addClass("has-success");
    });


});