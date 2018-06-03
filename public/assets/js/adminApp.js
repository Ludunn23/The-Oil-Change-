$(document).ready(function() {
    //DOM SELECTORS
    let $customerGo = $("#customer-search-go"),
        $carGo = $("#car-search-go"),
        $newCustomerName = $("#new-customer-name"),
        $newCustomerUsername = $("#new-customer-username"),
        $newCustomerPassword = $("#new-customer-password"),
        $addCustomer = $("#add-customer"),
        $newCarPlate = $("#new-car-plate"),
        $newCarMake = $("#new-car-make"),
        $newCarModel = $("#new-car-model"),
        $newCarYear = $("#new-car-year"),
        $newCarMileage = $("#new-car-mileage"),
        $newCarOwner = $("#new-car-owner"),
        $addCar = $("#add-car"),
        $newServiceType = $("#new-service-type"),
        $newServiceDate = $("#new-service-date"),
        $newServiceMileage = $("#new-service-mileage"),
        $newServiceUrl = $("#new-service-url"),
        $newServiceCar = $("#new-service-car"),
        $addService = $("#add-service"),
        $customersDisplay = $("#customers-display"),
        $carsDisplay = $("#cars-display"),
        $servicesDisplay = $("#services-display");

    //Page variables
    var customersArray = [],
        carsArray = [],
        servicesArray = [];


    //functions
    
    //print all customers
    function updateCustomers(){
        $.get("/api/customers", function(data){
            if(data) {
                customersArray = data;
                console.log(customersArray);
                $customersDisplay.empty();
                $newCarOwner.empty();
                data.map(i => {
                    if(i.isAdmin) {
                        $customersDisplay.append(
                            "<tr>" +
                                "<td>" + i.id + "</td>" +
                                "<td>" + i.name + "</td>" +
                                "<td>" + i.username + "</td>" +
                                "<td><button class = 'btn btn-primary car-button' id = 'cars-" + i.id + "'>See my Cars</button></td>" +
                                "<td><button class = 'btn btn-danger de-auth-button' id = 'de-authorize-" + i.id + "'>Remove Admin</button></td>" +
                            "</tr>"
                        );
                        $newCarOwner.append("<option>" + i.id + "- "+ i.name + "</option>")
                    } else {
                    $customersDisplay.append(
                        "<tr>" +
                            "<td>" + i.id + "</td>" +
                            "<td>" + i.name + "</td>" +
                            "<td>" + i.username + "</td>" +
                            "<td><button class = 'btn btn-primary car-button' id = 'cars-" + i.id + "'>See my Cars</button></td>" +
                            "<td><button class = 'btn btn-success auth-button' id = 'authorize-" + i.id + "'>Make Admin</button></td>" +
                        "</tr>"
                    );
                    $newCarOwner.append("<option>" + i.id + "- "+ i.name + "</option>")
                }
                });
            }
        });
    }
    //print all cars
    function updateCars(user) {
        if (user === 'all'){
        $.get("/api/cars", function(data) {
            if(data) {
                carsArray = data
                console.log(carsArray);
                $carsDisplay.empty();
                $newServiceCar.empty();
                data.map(i => {
                    $carsDisplay.append(
                        "<tr>" +
                            "<td>" + i.id + "</td>" +
                            "<td>" + i.plate + "</td>" +
                            "<td>" + i.make + "</td>" +
                            "<td>" + i.model + "</td>" +
                            "<td>" + i.year + "</td>" +
                            "<td>" + i.mileage + "</td>" +
                            "<td><button class = 'btn btn-primay service-button' id = 'services-" + i.id + "'>Service History</button></td>" +
                        "</tr>"
                    );
                    $newServiceCar.append("<option>" + i.id + "- " + i.plate + "</option>");
                })
                
            }
        });
        } else {
            $.get("/api/cars/" + user, function(data) {
                if(data) {
                    console.log(data);
                    $carsDisplay.empty();
                    data.map(i => {
                        $carsDisplay.append(
                        "<tr>" +
                        "<td>" + i.id + "</td>" +
                        "<td>" + i.plate + "</td>" +
                        "<td>" + i.make + "</td>" +
                        "<td>" + i.model + "</td>" +
                        "<td>" + i.year + "</td>" +
                        "<td>" + i.mileage + "</td>" +
                        "<td><button class = 'btn btn-primay service-button' id = 'services-" + i.id + "'>Service History</button></td>" +
                    "</tr>"
                    )
                    });
                }
            })
        }
    }

    //print all services
    function updateServices(car) {
        if (car === 'all') {
        $.get("/api/services", function(data) {
            if(data) {
                console.log(data);
                $servicesDisplay.empty();
                data.map(i => {
                    $servicesDisplay.append(
                        "<tr>" +
                        "<td>" + i.id + "</td>" +
                        "<td>" + i.serviceType + "</td>" +
                        "<td>" + i.date + "</td>" + 
                        "<td>" + i.mileage + "</td>" +
                        "<td>" + i.url + "</td>" +
                        "</tr>"
                    )
                });
            }
        })
        } else {
            $.get("/api/services/" + car, function(data) {
                if(data) {
                    console.log(data);
                    $servicesDisplay.empty();
                    data.map(i => $servicesDisplay.append(
                        "<tr>" +
                        "<td>" + i.id + "</td>" +
                        "<td>" + i.serviceType + "</td>" +
                        "<td>" + i.date + "</td>" + 
                        "<td>" + i.mileage + "</td>" +
                        "<td>" + i.url + "</td>" +
                        "</tr>"
                    ));
                }
            })
        }
    }
    //Initialize page
    updateCustomers();
    updateCars("all");
    updateServices("all");

    //listeners
    //add-customer listener
    $addCustomer.click(function(event){
        event.preventDefault();
        var newCustomer = {
            name: $newCustomerName.val().trim(),
            username: $newCustomerUsername.val().trim(),
            password: $newCustomerPassword.val().trim()
        };
        $newCustomerName.val("");
        $newCustomerUsername.val("");
        $newCustomerPassword.val("");
        $.post("/api/customer", newCustomer, function(){
            updateCustomers();
        })
    });

    //add-car listener
    $addCar.click(function(event){
        event.preventDefault();
        var newCar = {
            plate: $newCarPlate.val().trim(),
            make: $newCarMake.val().trim(),
            model: $newCarModel.val().trim(),
            year: $newCarYear.val().trim(),
            mileage: $newCarMileage.val().trim(),
            CustomerId: $newCarOwner.val().slice(0, $newCarOwner.val().indexOf("-"))
        };
        $newCarPlate.val("");
        $newCarMake.val("");
        $newCarModel.val("");
        $newCarYear.val("");
        $newCarMileage.val("");
        $.post("/api/car", newCar, function() {
            updateCars(newCar.CustomerId);
        })
    });

    //add-service listener
    $addService.click(function(event){
        event.preventDefault();
        var newService = {
            serviceType: $newServiceType.val().trim(),
            date: $newServiceDate.val().trim(),
            mileage: $newServiceMileage.val().trim(),
            url: $newServiceUrl.val().trim(),
            CarId: $newServiceCar.val().slice(0, $newServiceCar.val().indexOf("-"))
        };
        $newServiceType.val("");
        $newServiceDate.val("");
        $newServiceMileage.val("");
        $newServiceUrl.val("");
        $.post("/api/service", newService, function() {
            updateServices(newService.CarId);
        })
    });

    //see cars listener
    $(document).on("click", ".car-button", function(event) {
        var target = event.currentTarget.id.substr(5);
        console.log(target);
        updateCars(target);
    });

    //see services listener
    $(document).on("click", ".service-button", function(event) {
        var target = event.currentTarget.id.substr(9);
        console.log(target);
        updateServices(target);
    });

    //make a user an admin
    $(document).on("click", ".auth-button", function(event){
        var target = event.currentTarget.id.substr(10);
        $.get("/api/idcustomer/" + target, function(data){
            data.isAdmin = true;
            $.ajax({
                method: "PUT",
                url: "/api/customer/" + target,
                data: data
            }).then(function(){
                updateCustomers();
            })
        })
    });

    //revoke admin privileges
    $(document).on("click", ".de-auth-button", function(event){
        var target = event.currentTarget.id.substr(13);
        $.get("/api/idcustomer/" + target, function(data){
            data.isAdmin = false;
            $.ajax({
                method: "PUT",
                url: "/api/customer/" + target,
                data: data
            }).then(function(){
                updateCustomers();
            })
        })
    });

    //customer search listener
    $customerGo.click(function(event) {

    });

    //car search listener
    $carGo.click(function(event) {

    });
});