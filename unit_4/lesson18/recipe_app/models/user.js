const mongoose = require("mongoose");
const { Schema } = mongoose;

userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true, //getting rid of all white space
      },
      last: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    zipCode: {
      //5 digits long
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
  },
  {
    //keeps track when the document was created and /or updated
    timestamps: true,
  }
);

//returns full name 
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);
