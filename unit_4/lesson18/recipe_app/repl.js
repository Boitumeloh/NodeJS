const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

let testCourse;
let testSubscriber;

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;


/****************USER************* */

//Create a Subscriber
const User = require("./models/user");

Subscriber.create({
  name: "Boitumelo Lefophane2",
  email: "boitumelolefophane2@gmail.com",
  zipCode: "12342"})
  .then(subscriber => console.log(`Subscriber: ${subscriber}`))
  .catch(error => console.log(error.message));
  
  //Create a User
  let testUser;
  
  User.create({
    name: {
      first: "Boitumelo2",
      last: "Lefophane2",
    },
    email: "boitumelolefophane2@gmail.com",
    password: "password2",
  })
    .then((user) => {
      testUser = user;
      return Subscriber.findOne({
        email: testUser.email,
      });
    })
    .then((subscriber) => {
      if (subscriber) {
        // Link the subscriber to the user
        testUser.subscribedAccount = subscriber._id;
        return testUser.save();
      } else {
        throw new Error('Subscriber not found');
      }
    })
    .then((updatedUser) => {
      console.log(`Updated User: ${updatedUser}`);
      console.log("USER UPDATED!");
    })
    .catch((error) => console.log(error.message));