const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).populate("roleID", "name");

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  return res.json({
    message: "Login Successful",
    user: {
      id: user._id,
      username: user.username,
      role: user.roleID.name,
      imageUrl: user.imageUrl,
    },
  });
};
