const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
   },
  contents: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    lowercase: true,
    trim: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  participatedUser: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
    maxlength: 2,
  }]
});

module.exports = mongoose.model("Doc", DocSchema);
