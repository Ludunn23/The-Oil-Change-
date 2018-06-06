var db = require("../models");
var path = require('path');
var exports = module.exports = {};
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req, res) {
    if (req.user.isAdmin){
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    } else {
    db.Car.findAll({
        where: {Customerid: req.user.id}
    }).then(function(result) {
        res.render('myVehicles', {
            user: req.user,
            cars: result
        });
    })
    }
}

exports.admin = function(req, res) {
    if (req.user.isAdmin) {
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    } else {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    }
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}