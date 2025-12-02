const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

const {
  getAllCategories,
  getCategoriesByID,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoriesByID);
router.post("/create", categoryController.createCategories);
router.put("/update/:id", categoryController.updateCategories);
router.delete("/delete/:id", categoryController.deleteCategories);

module.exports = router;
