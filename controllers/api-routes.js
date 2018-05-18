//dependencies
var db = require("../models");

//routes
module.exports = function(app) {

//get all of a customer's vehicles
app.get("api/cars/", function(req, res) {
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
app.get("api/services", function(req, res) {
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
};