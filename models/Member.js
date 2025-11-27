const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  registerDate: { type: String, default: Date.now },
});

module.exports = mongoose.model("Member", memberSchema);
