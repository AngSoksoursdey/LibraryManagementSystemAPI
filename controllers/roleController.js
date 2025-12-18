const Role = require("../models/Role");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRoleByID = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.createRole = async (req, res) => {
//   try {
//     const role = new Role(req.body);
//     await role.save();
//     res.status(201).json({ message: "User create", role });
//   } catch {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json({ message: "Role created", role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
