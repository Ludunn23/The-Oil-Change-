//Dom Selectors
var $name = $("#signup-name"),
    $username = $("#signup-username"),
    $password = $("#signup-password"),
    $phone = $("#signup-phone"),
    $go = $("#signup-go");

//listener
$go.click(function(event){
    event.preventDefault();
    var newCustomer = {
        name: $name.val().trim(),
        phone: $phone.val().trim(),
        username: $username.val().trim(),
        password: $password.val().trim()
    };
    console.log(newCustomer);
    $.post("/api/customer", newCustomer, function(result){
        location.assign("./index.html");
    });
});