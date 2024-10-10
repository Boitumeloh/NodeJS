const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");
// const customMiddleWare = (req,res,next)=>{
//     console.log('Custom middle ware called');
//     next();
// };

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost.js");
const pagesController = require("./controllers/pagesController");
const validateMiddleware = require("./middleware/validationMiddleware");

const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const login = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const expressSession = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');
//const session = require('express-session');

const app = new express();

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
});

globalThis.loggedIn = null;

app.use(flash());

app.use(express.static("public"));

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
//app.use(customMiddleWare);
app.use("/posts/store", validateMiddleware);
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

app.use((req, res, next) => {
  res.locals.loginError = req.flash('loginError');
  res.locals.data = req.flash('data')[0];
  next();
});

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});


app.set("view engine", "ejs");

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/", homeController);

app.get("/about", pagesController.about);

app.get("/post/:id", getPostController);

app.get("/posts/new", authMiddleware, newPostController);

app.post("/posts/store", authMiddleware, storePostController);

app.get("/contact", pagesController.contact);

app.get('/auth/logout',logoutController);

app.use((req,res)=>res.render('notfound'));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
