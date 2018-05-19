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

//get all of a customer's vehicles
router.get("/api/cars/", function(req, res) {
    var query = {};
    if(req.query.customerid) {
        query.customerid = req.query.customerid;
    }

    db.Car.findAll({
        where: query,
        include: [db.Customer]
    }).then(function(result) {
        res.json(result);
    })
});

//get a vehicle's service history
router.get("/api/services", function(req, res) {
    var query = {};
    if(req.query.carid) {
        query.carid = req.query.carid;
    }

    db.Service.findAll({
        where: query,
        include: [db.Car]
    }).then(function(result){
        res.json(result);
    })
});

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