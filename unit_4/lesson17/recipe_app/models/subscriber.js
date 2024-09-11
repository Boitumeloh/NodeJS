"use strict";

const mongoose = require("mongoose");
const subscriberSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code must be 5 digits long"],
      max: 99999,
    },
    //courses that subscribers heve enrolled in
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
  });


//returns subscribers infomation
subscriberSchema.methods.getInfo = function() {
   return `Name: ${this.name} Email: ${this.email} Zip Code:${this.zipCode}`;
};

//finding subscribers zip code
subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model("Subscriber")
    .find({zipCode: this.zipCode})
    .exec();
 };


module.exports = mongoose.model("Subscriber", subscriberSchema);
