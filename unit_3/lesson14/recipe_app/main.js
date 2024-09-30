"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const Subscriber = require("./models/subscriber");

//connecting to database
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
// mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//let document to save to db

// let subscriber1 = new Subscriber({
//   name: "Boitumelo Lefophane",
//   email: "botumelolefophane@gmail.com"
// });

// subscriber1.save((err, savedDoc) => {
//   if(err) console.log(err);
//   console.log(savedDoc);
// })

Subscriber.create(
  {
    name: "Boitumelo Lefophane",
    email: "botumelolefophane@gmail.com"
  },
  function (err, savedDoc){
    if(err) console.log(err);
    console.log(savedDoc);
  }
)

//query
//finding a document according to a match in the email field
let myQuery = Subscriber.findOne({
  name: "Boitumelo Lefophane"
}).where("email", /lefophane/);

myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});