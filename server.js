// require dependencies
var mysql = require("mysql")
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
var JAWSDB_URL = "mysql://k6tg0mq8vqjobqi9:abkz3r9dn45znot9@axxb6a0z2kydkco3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/kd5lljabzyw21eoo"

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
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hacktheplanet',
    database: 'homemade_db'
  })
}
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser."+ PORT);
  });
});