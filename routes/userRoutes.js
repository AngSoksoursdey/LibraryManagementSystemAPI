const express = require("express");
const router = express.Router();
const { userUpload } = require("../middleware/multer");
const userController = require("../controllers/userController");

// Upload photo separate endpoint (your example)

router.post(
  "/upload-photo",
  userUpload.single("photo"),
  userController.uploadPhoto
);

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/create", userUpload.single("photo"), userController.createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
