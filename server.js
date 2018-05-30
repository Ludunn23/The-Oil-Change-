//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var passport = require('passport');
var exphbs = require("express-handlebars");
var session = require('express-session');


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

//auth
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());


//routing
var apiRoutes = require("./controllers/api-routes");
var htmlRoutes = require("./controllers/html-routes");
var authRoutes = require("./controllers/auth-routes")(app, passport);
app.use("/", apiRoutes);
app.use("/", htmlRoutes);
// app.use("/", authRoutes);

//views
var hbs = exphbs.create({defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//load passport strategies
require("./config/passport.js")(passport, db.Customer);



//listener
db.sequelize.sync({force: true}).then(function() {
app.listen(PORT, function(){
    console.log("App listening on http://localhost:" + PORT);
});
});
