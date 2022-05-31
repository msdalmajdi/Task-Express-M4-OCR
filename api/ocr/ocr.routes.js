const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();
const { ocrCreate } = require("./ocr.controllers");

router.post("/", upload.single("image"), ocrCreate);

module.exports = router;
