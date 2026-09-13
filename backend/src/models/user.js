const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is not strong enough");
      }
    },
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if (value !== "male" && value !== "female" && value !== "other") {
        throw new Error("Gender must be male, female, or other");
      }
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
