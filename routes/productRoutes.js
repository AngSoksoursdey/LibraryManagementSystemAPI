const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { productUpload } = require("../middleware/multer");

router.post(
  "/create",
  productUpload.single("photo"),
  //productController.createProducts,
  productController.getAllProducts,
  productController.getProductByID
);

const { createProducts } = require("../controllers/productController");

// router.post("/create", (req, res) => {
//   productUpload.single("photo")(req, res, function (err) {
//     if (err instanceof Error) {
//       return res.status(400).json({ message: err.message });
//     }
//     productController.createProducts(req, res);
//   });
// });

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductByID);

module.exports = router;
