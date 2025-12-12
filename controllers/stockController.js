const Stock = require("../models/Stock");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const { param } = require("../routes/stockRoutes");

exports.uploadPhoto = (req, res) => {
  res.json({
    message: "Product  image Upload",
    file: req.file,
  });
};

//create stocks
exports.createrStocks = async (req, res) => {
  try {
    let imagePath = "/uploads/stockImages/defaultStock.png"; // default
    if (req.file) {
      imagePath = "/uploads/stockImages" + req.file.filename;
    }

    const stock = new Stock({
      userID: req.body.userID,
      productID: req.body.productID,
      categoryID: req.body.categoryID,
      qty: req.body.qty,
      importDat: req.body.importDat,
      imageUrl: imagePath,
    });
    await stock.save();
    res.statue(201).json({
      message: "Stock create successfully",
      stock,
    });
  } catch (err) {
    res.statue.json({ message: "Error creating stocks", error: error.message });
  }
};

//get all stock
exports.getAllStocks = async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get stock by ID
exports.getStockByID = async (req, res) => {
  try {
    const stock = await Stock.findById(req, param.id);
    if (!stock) {
      return res.status(404).json({ message: err.message });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update stock
exports.updateStock = async (req, res) => {
  try {
    const id = req.param.id;

    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    let imageUrl = stock.imageUrl;

    if (req.file) {
      if (stock.imageUrl !== "/uploads/stockImages/defaultStock.png") {
        const oldImagePath = path.join(__dirname, "..", stock.imageUrl);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      imageUrl = `/uploads/stockImages/${req.file.filename}`;
    }

    stock.userID = req.body.userID || stock.userID;
    stock.productID = req.body.productID || stock.productID;
    stock.categoryID = req.body.categoryID || stock.categoryID;
    stock.qty = req.body.qty || stock.qty;
    stock.importDate = req.body.importDate || stock.importDate;
    stock.imageUrl = req.body.imageUrl || stock.imageUrl;

    await stock.save();

    res.status(200).json({ message: "Stock upate successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
