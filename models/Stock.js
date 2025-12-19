const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productName: { type: String, required: true },
  totalBorrow: { type: Number, default: 0 },
  status: { type: Boolean, required: true },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  qty: { type: Number, required: true },
  importDate: { type: Date, default: Date.now },
  imageUrl: { type: String, default: "/uploads/stockImages/defaultStock.png" },
});

module.exports = mongoose.model("Stock", stockSchema);
