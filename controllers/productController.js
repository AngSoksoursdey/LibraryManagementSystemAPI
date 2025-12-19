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
exports.createProducts = async (req, res) => {
  try {
    let imagePath = "/uploads/productImages/defaultProduct.png"; // default

    if (req.file) {
      imagePath = "/uploads/productImages/" + req.file.filename;
    }

    const product = new Product({
      productName: req.body.productName,
      qty: req.body.qty,
      totalBorrow: req.body.totalBorrow,
      status: req.body.status,
      categoryID: req.body.categoryID,
      imageUrl: imagePath,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get all product
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "categoryID",
      "categoryName"
    );
    //res.status(200).json(products);
    res.status(200).json({ message: "Get Products successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get product by ID
exports.getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryID",
      "categoryName"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    //res.status(200).json(product);
    res.status(200).json({ message: "Get Product successfully", product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update product
// exports.updateProducts = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ message: "product  not found" });
//     }

//     let imageUrl = product.imageUrl; //keep existing image

//     if (req.file) {
//       //delete old image if not default
//       if (product.imageUrl !== "/uploads/productImages/defaultProduct.png") {
//         const oldImagePath = path.join(__dirname, "..", product.imageUrl);
//         if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//       }

//       // Set new file path
//       imageUrl = `/uploads/productImages/${req.file.filename}`;
//     }

//     //update fields

//     product.productName = req.body.productName || product.productName;
//     product.qty = req.body.qty || product.qty;
//     product.totalBorrow = req.body.totalBorrow || product.totalBorrow;
//     product.status = req.body.status || product.status;
//     product.categoryID = req.body.categoryID || product.categoryID;
//     product.imageUrl = imageUrl;

//     await product.save();

//     res.status(200).json({ message: "product  updated successfully", product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

//update product
exports.updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.imageUrl; //keep existing image

    if (req.file) {
      //delete old image if not default
      if (product.imageUrl !== "/uploads/productImages/defaultProduct.png") {
        const oldImagePath = path.join(__dirname, "..", product.imageUrl);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      // Set new file path
      imageUrl = `/uploads/productImages/${req.file.filename}`;
    }
    // Update fields
    product.productName = req.body.productName || product.productName;
    product.qty = req.body.qty || product.qty;
    product.totalBorrow = req.body.totalBorrow || product.totalBorrow;
    product.status = req.body.status || product.status;
    product.categoryID = req.body.categoryID || product.categoryID;
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete product
exports.deleteProductsByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
