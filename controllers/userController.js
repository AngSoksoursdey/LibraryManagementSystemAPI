const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadPhoto = (req, res) => {
  res.json({
    message: "User image Upload",
    file: req.file,
  });
};
// Helper to validate image extension
function isValidImage(filename) {
  if (!filename) return true; // allow default if not provided
  const ext = path.extname(filename).toLowerCase();
  return ext === ".png" || ext === ".jpg" || ext === ".jpeg";
}
//create
exports.createUser = async (req, res) => {
  try {
    const {
      fullname,
      username,
      gender,
      password,
      phoneNumber,
      address,
      roleID,
      imageUrl,
    } = req.body;

    // Validate image extension
    if (!isValidImage(imageUrl)) {
      return res
        .status(400)
        .json({ message: "Only png, jpg, jpeg images are allowed" });
    }

    const user = new User({
      fullname,
      username,
      gender,
      password,
      phoneNumber,
      address,
      roleID,
      imageUrl: imageUrl || "/uploads/userImages/defaultUser.png", // default image if not provided
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

//update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      fullname,
      username,
      gender,
      password,
      phoneNumber,
      address,
      roleID,
    } = req.body;

    // If a new image file is uploaded
    let imageUrl = user.imageUrl; // keep old if not updated
    if (req.file) {
      imageUrl = "/uploads/userImages/" + req.file.filename;
    }

    // Update user fields
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.gender = gender || user.gender;
    user.password = password || user.password;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.roleID = roleID || user.roleID;
    user.imageUrl = imageUrl;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

//delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};
