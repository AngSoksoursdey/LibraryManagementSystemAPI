const product = require("../models/Product");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

exports.uploadPhoto = (req, res) => {
  res.json({
    message: "Product  image Upload",
    file: req.file,
  });
};
//Create Product
// exports.createProducts = async (req, res) => {
//   try {
//     let imagePath = "/uploads/productImages/defaultProduct.png"; // default

//     if (req.file) {
//       imagePath = "/uploads/productImages/" + req.file.filename;
//     }

//     const product = new Product({
//       productName: req.body.productName,
//       qty: req.body.qty,
//       totalBorrow: req.body.totalBorrow,
//       status: req.body.status,
//       categoryID: req.body.categoryID,
//       imageUrl: imagePath,
//     });

//     await product.save();

//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

//get all product
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
