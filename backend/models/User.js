const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
   },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
});

module.exports = mongoose.model("User", UserSchema);
