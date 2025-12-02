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
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} = require("../controllers/userController");

router.get("/", getAllUsers);
//router.post("/create", userUpload.single("photo"), userController.createUser);
router.post("/create", (req, res) => {
  userUpload.single("photo")(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    userController.createUser(req, res);
  });
});

router.get("/:id", getUserByID);

//router.put("/:id", updateUser);
// UPDATE USER (with optional new photo)
router.put("/:id", (req, res) => {
  userUpload.single("photo")(req, res, function (err) {
    // Multer file error
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }

    updateUserByID(req, res);
  });
});
router.delete("/:id", deleteUserByID);

module.exports = router;
