// require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

// set port
var PORT = process.env.PORT || 3000;
var db = require("./models");

//declare variable app for express function & using various express functions
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//requiring routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//syncing database using sequelize & listening on port
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});