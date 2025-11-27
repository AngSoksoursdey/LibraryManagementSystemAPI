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
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const clean = value.split("?")[0].split("#")[0].trim();
        return /\.(jpe?g|png)$/i.test(clean); // only jpg, jpeg, png at end
      },
      message: "Image must be JPG, JPEG, or PNG",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
