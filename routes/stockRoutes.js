const express = require("express");
const router = express.Router();
const { stockUpload } = require("../middleware/multer");
const stockController = require("../controllers/stockController");

router.post(
  "/upload-photo",
  stockUpload.single("photo"),
  stockController.uploadPhoto
);

const { createrStocks } = require("../controllers/stockController");

router.get("/", stockController.createrStocks);

module.exports = router;
