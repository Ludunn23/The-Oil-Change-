//dependencies
var db = require("../models");


//routes
var router = require('express').Router();

//get all customers
router.get("/api/customers", function(req, res) {
    db.Customer.findAll({}).then(function(result) {
        res.json(result);
    });
});

//get all vehicles
router.get("/api/cars/", function(req, res) {
    var query = {};
    if(req.query.CustomerId) {
        query.CustomerId = req.query.CustomerId;
    }

    db.Car.findAll({
        where: query,
        include: [db.Customer]
    }).then(function(result) {
        res.json(result);
    })
});

//get all service history
router.get("/api/services", function(req, res) {
    var query = {};
    if(req.query.CarId) {
        query.CarId = req.query.CarId;
    }

    db.Service.findAll({
        where: query,
        include: [db.Car]
    }).then(function(result){
        res.json(result);
    })
});

//get all of one customer's cars
router.get("/api/cars/:CustomerId", function(req, res) {
    var query = {};
    query.CustomerId = req.params.CustomerId;

    db.Car.findAll({
        where: query,
        include: [db.Customer]
    }).then(function(result) {
        res.json(result);
    });
});

//get the service history for one vehicle
router.get("/api/services/:CarId", function(req, res) {
    var query = {};
    query.CarId = req.params.CarId;

    db.Service.findAll({
        where: query,
        include: [db.Car]
    }).then(function(result) {
        res.json(result);
    });
})

//add a new customer
router.post("/api/customer", function(req, res) {
    db.Customer.create(req.body).then(function(result) {
        res.json(result);
    });
});

//add a new car
router.post("/api/car", function(req, res) {
    db.Car.create(req.body).then(function(result) {
        res.json(result);
    });
});

//add a new service
router.post("/api/service", function(req, res) {
    db.Service.create(req.body).then(function(result) {
        res.json(result);
    });
});

module.exports = router;
