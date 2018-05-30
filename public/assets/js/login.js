$(document).ready(function() {
    var $loginName = $("#login-name"),
        $loginUsername = $("#login-username"),
        $password = $("#password")
        $go = $("#go");

        $go.click(function(event) {
        $.post("/login", $loginUsername.val.trim(), $loginpassword.val.trim(), function(){
            alert("login successful");
        })
    })
});