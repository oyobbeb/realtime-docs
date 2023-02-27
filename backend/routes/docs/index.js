const express = require("express");
const router = express.Router();
const docsController = require("../controllers/docs.Controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, docsController.renderDocs);

module.exports = router;
