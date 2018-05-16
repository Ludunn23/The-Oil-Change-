//dependencies
var path = require("path");

//routes
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/faqs", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/faqs.html"));
    });

    app.get("/servicemenu", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/servicemenu.html"));
    });

    app.get("/myvehicles", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/myvehicles.html"));
    });

    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
}