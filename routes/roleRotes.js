const express = require("express");
const router = express.Router();

const {
  getAllRoles,
  createRole,
  getRoleByID,
} = require("../controllers/roleController");

router.get("/", getAllRoles);
router.post("/createRole", createRole);
router.get("/:id", getRoleByID);
module.exports = router;
