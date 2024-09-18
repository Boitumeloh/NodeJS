"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
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

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false,
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.use(express.json());

//Configure your Express.js application to use cookie-parser as middleware.
router.use(cookieParser("secret_passcode"));

// Configure express session to use cookie-parser.
router.use(
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
router.use(passport.initialize());
//configure passport to use sessions in express.js
router.use(passport.session());

//Configure your application to use connect-flash as middleware.
router.use(connectFlash());

//Assign flash messages to the local flashMessages variable on the response object.
router.use((req, res, next) => {
  //setting up logged in variable to reflect passport login status
  res.locals.loggedIn = req.isAuthenticated();
  //set up current user to reflect loggedin user
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

router.use(expressValidator());

router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
// router.post(
//   "/users/create",
//   usersController.create,
//   usersController.redirectView
// );
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/users/login", usersController.login);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);

router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
);
router.get("/courses/:id/edit", coursesController.edit);
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
);
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);
router.get("/courses/:id", coursesController.show, coursesController.showView);

router.post("/subscribe", subscribersController.saveSubscriber);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
