const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    maxlength: 50,
   },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  uid: {
    type: String,
  }
});

module.exports = mongoose.model("User", UserSchema);
