const express = require("express");
const router = express.Router();
const { stockUpload } = require("../middleware/multer");
const stockController = require("../controllers/stockController");

router.post(
  "/upload-photo",
  stockUpload.single("photo"),
  stockController.uploadPhoto
);

const {
  createrStocks,
  getAllStocks,
  getStockByID,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

//router.get("/", stockController.createrStocks);\
router.post(
  "/create",
  stockUpload.single("photo"),
  stockController.createrStocks
);

router.get("/", getAllStocks);
router.get("/:id", getStockByID);
router.put("/update/:id", stockUpload.single("photo"), updateStock);
router.delete("/delete/:id", deleteStock);

module.exports = router;
