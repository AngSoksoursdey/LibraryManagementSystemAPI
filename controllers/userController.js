const User = require("../models/User");
const path = require("path");
const fs = require("fs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("roleID", "name");
    res.status(200).json({ message: "Get Users successfully", users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    //const user = await User.findById(id).select("-password");
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("roleID", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Get User successfully", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.uploadPhoto = (req, res) => {
//   res.json({
//     message: "User image Upload",
//     file: req.file,
//   });
// };
exports.uploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `/uploads/userImages/${req.file.filename}`;

  res.status(200).json({
    url: imageUrl, // ✅ Angular expects this
  });
};

// Helper to validate image extension

//-----------------------------------------------------------------------------create-------------------------------------------------------------------------
exports.createUser = async (req, res) => {
  try {
    let imagePath = "/uploads/userImages/defaultUser.png"; // default

    if (req.file) {
      imagePath = "/uploads/userImages/" + req.file.filename;
    }

    const user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      gender: req.body.gender,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      roleID: req.body.roleID,
      imageUrl: imagePath,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

//update
exports.updateUserByID = async (req, res) => {
  try {
    const id = req.params.id;

    //FAIND EXisting user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl = user.imageUrl; //keep existing image

    if (req.file) {
      //delete old image if not default
      if (user.imageUrl !== "/uploads/userImages/defaultUser.png") {
        const oldImagePath = path.join(__dirname, "..", user.imageUrl);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      // Set new file path
      imageUrl = `/uploads/userImages/${req.file.filename}`;
    }

    //update fields
    user.fullname = req.body.fullname || user.fullname;
    user.username = req.body.username || user.username;
    user.gender = req.body.gender || user.gender;
    user.password = req.body.password || user.password;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address || user.address;
    user.roleID = req.body.roleID || user.roleID;
    user.imageUrl = imageUrl;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete
exports.deleteUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};
