var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");

//INDEX - shows all campgrounds
router.get("/",  function(req, res) {
  var noMatch;
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Campground.find({"name":regex}, function(err, allCampgrounds) {
      if (err) {
        console.log("ERROR");
      } else {
        if(allCampgrounds.length == 0) {
          noMatch = "Sorry, no campgrounds found. Please try again";
        }
        res.render("campgrounds/index" , {campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
      }
    });
  } else {
    Campground.find({}, function(err, allCampgrounds) {
      if (err) {
        console.log("ERROR");
      } else {
        res.render("campgrounds/index" , {campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
      }
    });
  }
  
});

//NEW - shows the form to create campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});

//SHOW - show more details of campground
router.get("/:id", function(req, res) {
  //Find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
      Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
          console.log(err);
        } else {
          res.render("campgrounds/edit", {campground: foundCampground});
        }
      
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
    if(err) {
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground updated!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err){
      res.redirect("/campgrounds/" + req.params.id);
    } else {
      req.flash("success", "Campground deleted!");
      res.redirect("/campgrounds");
    }
  });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;