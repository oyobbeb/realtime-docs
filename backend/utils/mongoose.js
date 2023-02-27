const mongoose = require("mongoose");

function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on("error", err => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", () => {
    console.log("MongoDB server connected.");
  });
}

module.exports = connectToMongoDB;
