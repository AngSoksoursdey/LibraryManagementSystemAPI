const Stock = require("../models/Stock");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const { param } = require("../routes/stockRoutes");

exports.uploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `/uploads/stockImages/${req.file.filename}`;

  res.status(200).json({
    url: imageUrl, // ✅ Angular expects this
  });
};

//create stocks

exports.createrStocks = async (req, res) => {
  try {
    let imagePath = "/uploads/stockImages/defaultStock.png"; // default
    if (req.file) {
      imagePath = "/uploads/stockImages/" + req.file.filename;
    }
    let qtyValue = req.body.qty;
    const totalBorrowValue = req.body.totalBorrow;
    if (totalBorrowValue > 0) {
      qtyValue = qtyValue - totalBorrowValue;
      if (qtyValue < 0) qtyValue = 0; // Ensure qty doesn't go negative
    }
    const stock = new Stock({
      userID: req.body.userID,
      productName: req.body.productName,
      totalBorrow: totalBorrowValue,
      status: req.body.status,
      categoryID: req.body.categoryID,
      qty: qtyValue,
      importDate: req.body.importDate,
      imageUrl: imagePath,
    });
    await stock.save();
    res.status(201).json({
      message: "Stock create successfully",
      stock,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get all stock
exports.getAllStocks = async (req, res) => {
  try {
    const stock = await Stock.find()
      .populate("categoryID", "categoryName")
      .populate("userID", "username");
    if (!stock) {
      res.status(404).json({ message: "No stocks found" });
    }
    res.status(200).json({ message: "Stocks retrieved successfully", stock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get stock by ID
exports.getStockByID = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id)
      .populate("categoryID", "categoryName")
      .populate("userID", "username");
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json({ message: "Stock retrieved successfully", stock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update stock
exports.updateStock = async (req, res) => {
  try {
    const id = req.params.id;
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
    let qtyValue = req.body.qty || stock.qty;
    const totalBorrowValue = req.body.totalBorrow || stock.totalBorrow;
    if (totalBorrowValue > 0) {
      qtyValue = qtyValue - totalBorrowValue;
      if (qtyValue < 0) qtyValue = 0; // Ensure qty doesn't go negative
    }

    stock.userID = req.body.userID || stock.userID;
    stock.productName = req.body.productName || stock.productName;
    stock.totalBorrow = totalBorrowValue;
    stock.status = req.body.status || stock.status;
    stock.categoryID = req.body.categoryID || stock.categoryID;
    stock.qty = qtyValue;
    stock.importDate = req.body.importDate || stock.importDate;
    stock.imageUrl = imageUrl;
    await stock.save();
    res.status(200).json({ message: "Stock updated successfully", stock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//delete stock
exports.deleteStock = async (req, res) => {
  try {
    const id = req.params.id;
    const stock = await Stock.findByIdAndDelete(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    if (stock.imageUrl !== "/uploads/stockImages/defaultStock.png") {
      const imagePath = path.join(__dirname, "..", stock.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    res.status(200).json({ message: "Stock deleted successfully", stock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
