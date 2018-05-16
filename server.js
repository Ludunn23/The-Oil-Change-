//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var PORT = process.env.PORT || 8080;

//initialization
var app = express();

//static content(public folder)
app.use(express.static(path.join(__dirname, '/public')));

//parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
require("./controllers/api-routes.js")(app);
require("./controllers/html-routes.js")(app);

//listener
app.listen(PORT, function(){
    console.log("App listening on http://localhost:" + PORT);
});