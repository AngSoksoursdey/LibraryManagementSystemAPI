const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: { type: Number, required: true },
  importDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stock", stockSchema);
