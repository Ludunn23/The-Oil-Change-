//dependencies
var path = require("path");

//routes
var router = require('express').Router();

    router.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    router.get("/faqs", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/faqs.html"));
    });

    router.get("/servicemenu", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/servicemenu.html"));
    });

    router.get("/myvehicles", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/myvehicles.html"));
    });

    router.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    router.get("/admin", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    });

    router.get("/logintest", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/loginTest.html"));
    });

    module.exports = router;
