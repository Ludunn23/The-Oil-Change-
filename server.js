//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var PORT = process.env.PORT || 8080;

//initialization
var app = express();

//static content(public folder)
app.use(express.static(path.join(__dirname, '/public')));

//models for syncing
var db = require("./models");

//parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
// require("./controllers/api-routes")(app);
// require("./controllers/html-routes")(app);
var apiRoutes = require("./controllers/api-routes");
var htmlRoutes = require("./controllers/html-routes");
app.use("/", apiRoutes);
app.use("/", htmlRoutes);


//listener
db.sequelize.sync({}).then(function() {
app.listen(PORT, function(){
    console.log("App listening on http://localhost:" + PORT);
});
});