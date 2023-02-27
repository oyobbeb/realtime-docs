const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.Controller");

router.get("/", authController.renderMain);
router.post("/", authController.changeToken);

module.exports = router;
