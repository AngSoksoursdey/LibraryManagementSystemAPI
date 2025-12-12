const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", login);

module.exports = router;
