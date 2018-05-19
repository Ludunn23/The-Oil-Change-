$(document).ready(function() {
    //DOM SELECTORS
    let $newCustomerName = $("#new-customer-name"),
        $addCustomer = $("#add-customer"),
        $newCarVin = $("#new-car-vin"),
        $newCarMake = $("#new-car-make"),
        $newCarModel = $("#new-car-model"),
        $newCarYear = $("#new-car-year"),
        $newCarOwner = $("#new-car-owner"),
        $addCar = $("#add-car"),
        $newServiceType = $("#new-service-type"),
        $newServiceDate = $("#new-service-date"),
        $newServiceUrl = $("#new-service-url"),
        $newServiceCar = $("#new-service-car"),
        $addService = $("#add-service"),
        $customersDisplay = $("#customers-display"),
        $carsDisplay = $("#cars-display"),
        $servicesDisplay = $("#services-display");


    //functions
    //print all customers
    function updateCustomers(){
        $.get("/api/customers", function(data){
            if(data) {
                console.log(data);
                $customersDisplay.empty();
                data.map(i => $customersDisplay.append("<li>" + i.name + "</li>"));
            }
        });
    }
    //print all cars
    function updateCars() {
        $.get("/api/cars", function(data) {
            if(data) {
                console.log(data);
                $carsDisplay.empty();
                data.map(i => $carsDisplay.append("<li>" + i.vin + "</li>"));
            }
        });
    }

    //print all services
    function updateServices() {
        $.get("/api/services", function(data) {
            if(data) {
                console.log(data);
                $servicesDisplay.empty();
                data.map(i => $servicesDisplay.append("<li>" + i.serviceType + "</li>"));
            }
        })
    }

    //listeners
    //add-customer listener
    $addCustomer.click(function(event){
        event.preventDefault();
        var newCustomer = {name: $newCustomerName.val().trim()};
        $.post("/api/customer", newCustomer, function(){
            updateCustomers();
        })
    });

    //add-car listener
    $addCar.click(function(event){
        event.preventDefault();
        var newCar = {
            vin: $newCarVin.val().trim(),
            make: $newCarMake.val().trim(),
            model: $newCarModel.val().trim(),
            year: $newCarYear.val().trim(),
            CustomerId: $newCarOwner.val()
        };
        $.post("/api/car", newCar, function() {
            updateCars();
        })
    });

    //add-service listener
    $addService.click(function(event){
        event.preventDefault();
        var newService = {
            serviceType: $newServiceType.val().trim(),
            date: $newServiceDate.val().trim(),
            url: $newServiceUrl.val().trim(),
            CarId: $newServiceCar.val()
        };
        $.post("/api/service", newService, function() {
            updateServices();
        })
    });
});