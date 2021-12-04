var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose =
    require("passport-local-mongoose"),
  User = require("./models/user");
  debugger

mongoose.connect("mongodb://localhost/auth_demo_app").then(() => { console.log('Connected') });

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES -- START
//=====================

// Showing home page
app.get("/", function (req, res) {
  res.render("login");
});

// Showing register form
app.get("/register", function (req, res) {
  res.render("register");
});

// Showing secret page
app.get("/index", isLoggedIn, function (req, res) {
  res.render("phone/index");
});

app.get("/apmstaff_index", isLoggedIn, function (req, res) {
  res.render("phone/apmstaff_index");
});

app.get("/apostaff_indexpage", isLoggedIn, function (req, res) {
  res.render("phone/apostaff_indexpage");
});

app.get("/wip", isLoggedIn, function (req, res) {
  res.render("phone/wip");
});

app.get("/GramaSachivalayam", isLoggedIn, function (req, res) {
  res.render("phone/GramaSachivalayam");
});

app.get("/mpdostaff_index", isLoggedIn, function (req, res) {
  res.render("phone/mpdostaff_index");
});

app.get("/mrostaff_index", isLoggedIn, function (req, res) {
  res.render("phone/mrostaff_index");
});



//=====================
// ROUTES -- END
//=====================

// Handling user signup
app.post("/register", function (req, res) {
  var username = req.body.username
  var password = req.body.password
  User.register(new User({ username: username }),
    password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }

      passport.authenticate("local")(
        req, res, function () {
          res.render("landing");
        });
    });
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

// Handling user login
// app.post("/login", passport.authenticate("local", {
//   successRedirect: "/landing",
//   failureRedirect: "/login"
// }), function (req, res) {
// });

app.post("/login", passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login"
}), function (req, res) {
});



//Handling user logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Test-1")
  console.log("Server Has Started!");
  
});
