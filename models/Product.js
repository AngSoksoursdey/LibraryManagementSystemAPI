const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  totalBorrow: { type: Number, default: 0 },
  status: { type: Boolean, required: true },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  categoryName: { type: String, required: true },
  imageUrl: {
    type: String,
    default: "/uploads/productImages/defaultProduct.png",
  },
});

module.exports = mongoose.model("Product", productSchema);
