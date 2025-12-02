const product = require("../models/Product");

//Create Product
exports.createProduct = async (req, res) => {
  try {
    const { productName, description, price, category, stock } = req.body;

    const product = await product.create({
      productName,
      description,
      price,
      category,
      stock,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
