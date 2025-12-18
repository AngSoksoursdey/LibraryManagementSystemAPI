const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

const {
  createReport,
  getAllReports,
  getReportByID,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

router.post("/create", reportController.createReport);
router.get("/", reportController.getAllReports);
router.get("/:id", reportController.getReportByID);
router.put("/update/:id", reportController.updateReport);
router.delete("/delete/:id", reportController.deleteReport);

module.exports = router;
