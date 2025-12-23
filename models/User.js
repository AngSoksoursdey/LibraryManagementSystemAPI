const mongoose = require("mongoose");
const { validate } = require("./Member");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  roleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  roleName: { type: String, required: true },
  imageUrl: { type: String, default: "/uploads/userImages/defaultUser.png" },
});

module.exports = mongoose.model("User", userSchema);
