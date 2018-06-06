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

    // router.get("/admin", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/admin.html"));
    // });

    module.exports = router;
