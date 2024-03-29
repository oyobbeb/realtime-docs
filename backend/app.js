require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongoDB = require("./utils/mongoose");

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth/index");
const mainRouter = require("./routes/main/index");
const docRouter = require("./routes/docs/index");

connectToMongoDB();

app.use("/auth", authRouter);
app.use("/", mainRouter);
app.use("/docs", docRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  return res.send({ error: err.message });
});

module.exports = app;
