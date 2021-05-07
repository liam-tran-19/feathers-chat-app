const { Schema, model } = require("mongoose");

// Create Schema
const UserSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const User = model("user", UserSchema);

module.exports = User;
