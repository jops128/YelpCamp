var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

//require routes
var campgroundsRoutes = require("./routes/campgrounds"),
    commentsRoutes    = require("./routes/comments"),
    indexRoutes       = require("./routes/index"),
    profileRoutes     = require("./routes/profile");

// seedDB(); //seed the database 
mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Mica je najbolja",
  resave: false,
  saveUninitialized: false
}));

app.locals.moment = require("moment");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments/", commentsRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/profile/:id", profileRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("YelpCamp Server Has Started At https://js-project-jops.c9users.io/");
});