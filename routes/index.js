var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT 
router.get("/", function(req, res) {
  res.render("landing");
});

//==========
//AUTH ROUTES
//==========

//SIGN UP
router.get("/register", function(req, res) {
   res.render("register", {page: 'register'}); 
});

router.post("/register", function(req, res) {
   User.register(new User({username: req.body.username, name: "", email: "", bio:""}), req.body.password, function(err, user){
     if(err){
       console.log(err);
       req.flash("error", err.message);
       return res.redirect("/register");
     }
     passport.authenticate("local")(req, res, function(){
       req.flash("success", "Welcome to YelpCamp " + user.username);
       res.redirect("/campgrounds");
     });
   });
});

//LOGIN
router.get("/login", function(req, res) {
   res.render("login", {page: 'login'}); 
});

router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res) {
});

//LOGOUT
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged out!");
   res.redirect("/campgrounds");
});


module.exports = router;