const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});

//usingpromises as we did in main.js
mongoose.Promise = global.Promise;

Subscriber.create({
  name: "Jon",
  email: "jon@jonwexler.com",
  zipCode: "12345",
})
  .then((subscriber) => console.log(subscriber))
  .catch((error) => console.log(error.message));
let subscriber;
Subscriber.findOne({
  name: "Jon",
}).then((result) => {
  subscriber = result;
  console.log(subscriber.getInfo());
});
