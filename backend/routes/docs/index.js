const express = require("express");
const router = express.Router();
const docsController = require("../controllers/docs.Controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, docsController.renderDocs);

router.post("/new", verifyToken, docsController.saveNewDocs);

router.post("/mydocs", docsController.renderMyDocs);

router.get("/:id", verifyToken, docsController.renderEachDoc);
router.post("/:id", verifyToken, docsController.updateContents);

module.exports = router;
