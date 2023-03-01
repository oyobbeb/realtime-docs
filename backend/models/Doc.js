const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
   },
  contents: {
    type: String,
    required: true,
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
  createdById: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Doc", DocSchema);
