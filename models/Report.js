const mongoose = require("mongoose");
//const { use } = require("react");

const reportSchema = new mongoose.Schema({
  memberID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  borrowDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: Boolean, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Report", reportSchema);
