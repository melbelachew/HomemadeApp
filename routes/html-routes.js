var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/recipes");
    }
    res.sendFile(path.join(__dirname, "../public/join.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/recipes");
    }
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });

  app.get("/recipes", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recipes.html"));
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  })
};