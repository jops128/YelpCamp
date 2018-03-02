var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var User = require("../models/user");
var middleware = require("../middleware");

//index
router.get("/", function(req, res){
  User.findById(req.params.id, function(err, foundUser) {
    Campground.find({"author.username": foundUser.username}, function(err, campground) {
    if(err){
      console.log(err);
    } else {
      res.render("profile/index", {user: foundUser, campground: campground});
    }
  
    }); 
  });
});

//edit
router.get("/edit", function(req, res){
  res.render("profile/edit");
});

//update
router.put("/", function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body.info, function(err, updatedProfile){
    if(err) {
      console.log(err);
      req.flash("error", "Something went wrong, please try again");
      res.redirect("/");
    } else {
      req.flash("success", "Profile updated!");
      res.redirect("/profile/" + req.params.id);
    }
  });
});

module.exports = router;