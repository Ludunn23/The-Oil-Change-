$(document).ready(function() {
    //DOM SELECTORS
    let $customerSearch = $("#customer-search"),
        $customerGo = $("#customer-search-go"),
        $allCustomers = $("#all-customers"),
        $allAdmins = $("#all-admins"),
        $carSearch = $("#car-search"),
        $carGo = $("#car-search-go"),
        $newCustomer = $("#new-customer"),
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
        $newCarOwnerID = $("#new-car-owner-id"),
        $addCar = $("#add-car"),
        $newServiceType = $("#new-service-type"),
        $newServiceDate = $("#new-service-date"),
        $newServiceMileage = $("#new-service-mileage"),
        $newServiceUrl = $("#new-service-url"),
        $newServiceCar = $("#new-service-car"),
        $newServiceCarID = $("#new-service-car-id"),
        $addService = $("#add-service"),
        $customersDisplay = $("#customers-display"),
        $carsDisplay = $("#cars-display"),
        $servicesDisplay = $("#services-display"),
        $customerModal = $("#add-customer-modal"),
        $customerClose = $("#customer-modal-close"),
        $carModal = $("#add-car-modal"),
        $carClose = $("#car-modal-close")
        $serviceModal = $("#add-service-modal"),
        $serviceClose = $("#service-modal-close");

    //Page variables
    var customersArray = [],
        carsArray = [],
        servicesArray = [];


    //functions

    //show a customer
    function showCustomer(customer) {
        if(customer.isAdmin) {
            $customersDisplay.append(
                    "<tr>" +
                        "<td>" + customer.id + "</td>" +
                        "<td>" + customer.name + "</td>" +
                        "<td>" + customer.username + "</td>" +
                        "<td><button class = 'btn btn-primary car-button' id = 'cars-" + customer.id + "'>See my Cars</button></td>" +
                        "<td><button class = 'btn btn-danger de-auth-button' id = 'de-authorize-" + customer.id + "'>Remove Admin</button></td>" +
                        "<td><button class = 'btn btn-warning add-car-button' id = 'add-car-" + customer.id + "'>New car for User</button></td>" +
                    "</tr>"
                );
                $newCarOwner.empty();
                $newCarOwner.append("<option>" + customer.id + "- "+ customer.name + "</option>")
            } else {
            $customersDisplay.append(
                "<tr>" +
                    "<td>" + customer.id + "</td>" +
                    "<td>" + customer.name + "</td>" +
                    "<td>" + customer.username + "</td>" +
                    "<td><button class = 'btn btn-primary car-button' id = 'cars-" + customer.id + "'>See my Cars</button></td>" +
                    "<td><button class = 'btn btn-success auth-button' id = 'authorize-" + customer.id + "'>Make Admin</button></td>" +
                    "<td><button class = 'btn btn-warning add-car-button' id = 'add-car-" + customer.id + "'>New car for User</button></td>" +
                "</tr>"
            );
            $newCarOwner.empty();
            $newCarOwner.append("<option>" + customer.id + "- "+ customer.name + "</option>")
        }
    }
    //print all customers
    function updateCustomers(){
        $.get("/api/customers", function(data){
            if(data) {
                customersArray = data;
                console.log(customersArray);
                $customersDisplay.empty();
                $newCarOwner.empty();
                data.map(i => {
                    showCustomer(i);
                });
            }
        });
    };
    //show a car
    function showCar(car) {
        $carsDisplay.append(
            "<tr>" +
                "<td>" + car.id + "</td>" +
                "<td>" + car.plate + "</td>" +
                "<td>" + car.make + "</td>" +
                "<td>" + car.model + "</td>" +
                "<td>" + car.year + "</td>" +
                "<td>" + car.mileage + "</td>" +
                "<td><button class = 'btn btn-primay service-button' id = 'services-" + car.id + "'>Service History</button></td>" +
                "<td><button class = 'btn btn-warning add-service-button' id = 'add-service-" + car.id + "'>Add a Service</button></td>" +
            "</tr>"
        );
        $newServiceCar.append("<option>" + car.id + "- " + car.plate + "</option>");
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
                    showCar(i);
                })
                
            }
        });
        } else {
            $.get("/api/cars/" + user, function(data) {
                if(data) {
                    console.log(data);
                    $carsDisplay.empty();
                    $newServiceCar.empty();
                    data.map(i => {
                        showCar(i);
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
    // updateCustomers();
    // updateCars("all");
    // updateServices("all");

    //listeners

    //see all customers
    $allCustomers.click(function(event){
        event.preventDefault();
        updateCustomers();
    })
    //see all admins
    $allAdmins.click(function(event){
        event.preventDefault();
        $customersDisplay.empty();
        $.get("/api/admins", function(data){
            data.map(i => showCustomer(i));
        })
    })

    //display the add-customer form
    $newCustomer.click(function(event) {
        event.preventDefault();
        $customerModal.css({"display": "block"});
    })
    //hide the add-customer form
    $customerClose.click(function(event){
        event.preventDefault();
        $customerModal.css({"display": "none"});
    });
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
        $.post("/api/customer", newCustomer, function(result){
            $customersDisplay.empty();
            showCustomer(result);
            $customerModal.css({"display": "none"});
        })
    });

    //display the add-car form
    $(document).on("click", ".add-car-button", function(event){
        event.preventDefault();
        var target = event.currentTarget.id.substr(8);
        $carModal.css({"display": "block"});
        $.get("/api/idcustomer/" + target, function(data){
            var id = data.id;
            var owner = data.name;
            $newCarOwner.val(owner);
            $newCarOwnerID.val(id);
        })
    });
    //hide the add-car form
    $carClose.click(function(event){
        event.preventDefault();
        $carModal.css({"display": "none"});
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
            CustomerId: $newCarOwnerID.val()
        };
        $newCarPlate.val("");
        $newCarMake.val("");
        $newCarModel.val("");
        $newCarYear.val("");
        $newCarMileage.val("");
        $.post("/api/car", newCar, function() {
            updateCars(newCar.CustomerId);
            $carModal.css({"display": "none"});
        })
    });

    //display the add-service form
    $(document).on("click", ".add-service-button", function(event){
        event.preventDefault();
        var target = event.currentTarget.id.substr(12);
        var today = new Date();
        var todayFormatted = moment(today).format("YYYY-MM-DD");
        $serviceModal.css({"display": "block"});
        $.get("/api/idcar/" + target, function(data) {
            var id = data.id
            var car = data.plate;
            $newServiceCar.val(car);
            $newServiceDate.val(todayFormatted);
            $newServiceCarID.val(id);
        });
    });
    //hide the add-service form
    $serviceClose.click(function(event){
        event.preventDefault();
        $serviceModal.css({"display": "none"});
    });
    //add-service listener
    $addService.click(function(event){
        event.preventDefault();
        var newService = {
            serviceType: $newServiceType.val(),
            date: $newServiceDate.val().trim(),
            mileage: $newServiceMileage.val().trim(),
            url: "url",
            CarId: $newServiceCarID.val()
        };
        $newServiceType.val("");
        $newServiceDate.val("");
        $newServiceMileage.val("");
        $newServiceUrl.val("");
        $.post("/api/service", newService, function() {
            updateServices(newService.CarId);
            $serviceModal.css({"display": "none"});
            $.get("/api/idcar/" + newService.CarId, function(data){
                data.mileage = newService.mileage;
                $.ajax({
                    method: "PUT",
                    url: "/api/car/" + data.id,
                    data: data
                }).then(function(){
                    updateCars(data.CustomerId);
                })
            })
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
        event.preventDefault();
        var search = $customerSearch.val().trim();
        $customersDisplay.empty();
        $.get("/api/customer/" + search, function(data){
            data.map(i => {
                showCustomer(i);
            })
        })
    });

    //car search listener
    $carGo.click(function(event) {
        event.preventDefault();
        var search = $carSearch.val().trim();
        $carsDisplay.empty();
        $.get("/api/car/" + search, function(data) {
            console.log(data);
            data.map(i => {
                showCar(i);
            })
        })
    }); 
});