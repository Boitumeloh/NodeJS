"use strict";

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Subscriber = require("./models/subscriber");

//requireing the flash messaging
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

//importing express validator
const expressValidator = require("express-validator");

//importing passport module
const passport = require("passport");

//importing the user model
const User = require("./models/user");

const router = require("./routes/index");

//configuring the users login strategy
passport.use(User.createStrategy());
//setting up passport to serialize and deserialize our user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
//API SETUP
app.set("token", process.env.TOKEN || "recipeT0k3n");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(express.json());

//Configure your Express.js application to use cookie-parser as middleware.
app.use(cookieParser("secret_passcode"));

// Configure express session to use cookie-parser.
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    //
    resave: false,
    saveUninitialized: false,
  })
);

//initializing passport
app.use(passport.initialize());
//configure passport to use sessions in express.js
app.use(passport.session());

//Configure your application to use connect-flash as middleware.
app.use(connectFlash());

//Assign flash messages to the local flashMessages variable on the response object.
app.use((req, res, next) => {
  //setting up logged in variable to reflect passport login status
  res.locals.loggedIn = req.isAuthenticated();
  //set up current user to reflect loggedin user
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use(expressValidator());



app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
