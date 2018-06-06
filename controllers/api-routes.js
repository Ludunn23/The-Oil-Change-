//dependencies
var db = require("../models");
var bCrypt = require('bcrypt-nodejs');



//routes
var router = require('express').Router();

//get all customers
router.get("/api/customers", function(req, res) {
    db.Customer.findAll({}).then(function(result) {
        res.json(result);
    });
});

//get all customers with admin privileges
router.get("/api/admins", function(req, res) {
    db.Customer.findAll({
        where: {isAdmin: true}
    }).then(function(result) {
        res.json(result);
    })
})

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
    
    var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    req.body.password = generateHash(req.body.password);
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

//Update a customer
router.put("/api/customer/:id", function(req, res) {
    db.Customer.update(
        req.body,
        {where: {
            id: req.params.id
        }
    }).then(function(result){
        res.json(result);
    })
});

//Update a car
router.put("/api/car/:id", function(req, res) {
    db.Car.update(
        req.body,
        {where: {
            id: req.params.id
        }}
    ).then(function(result){
        res.json(result);
    })
})

//find a customer by phone number
router.get("/api/customer/:search", function(req, res){
    db.Customer.findOne({
        where: {
            phone: req.params.search
        }
    }).then(function(result){
        res.json(result)
    })
});

//find a customer by id
router.get("/api/idcustomer/:id", function(req, res){
    db.Customer.findOne({
        where: {id: req.params.id}
    }).then(function(result) {
        res.json(result);
    });
});

//find a car by plate
router.get("/api/car/:search", function(req, res) {
    db.Car.findAll({
        where:{
            plate: req.params.search
        }
    }).then(function(result){
        res.json(result);
    })
});

//find a car by id
router.get("/api/idcar/:id", function(req, res){
    db.Car.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(result){
        res.json(result);
    })
})

module.exports = router;
