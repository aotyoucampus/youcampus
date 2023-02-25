const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneno: {
    type: String,
    trim: true,
    unique: true,
  },
  branch: {
    type: String,
    trim: true,
  },
  roll: {
    type: Number,
    trim: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
