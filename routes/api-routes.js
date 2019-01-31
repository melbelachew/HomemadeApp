var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/signin", passport.authenticate("local"), function(req, res) {
    res.json("/recipes");
  });

  app.post("/api/join", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(dbResponse) {
      res.redirect(307, "/api/signin")
      // res.json(dbResponse);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        user: req.user.username,
        id: req.user.id
      });
    }
  });
  // app.get("/api/posts/:id", function(req, res) {
  //   db.Post.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // // POST route for saving a new post
  // app.post("/api/posts", function(req, res) {
  //   console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });
};