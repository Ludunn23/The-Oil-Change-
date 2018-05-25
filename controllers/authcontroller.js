var db = require("../models");
var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req, res) {
    console.log(req.user);
    db.Car.findAll({
        where: {Customerid: req.user.id}
    }).then(function(result) {
        res.render('myvehicles', {
            user: req.user,
            cars: result
        });
    })
    // res.render('dashboard');
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}