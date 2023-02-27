const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.Controller");

router.get("/signin", authController.renderSignin);

module.exports = router;
