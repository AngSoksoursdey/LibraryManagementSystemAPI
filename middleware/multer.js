const multer = require("multer");
const path = require("path");

// Dynamic storage generator
function createStorage(folderName) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("uploads", folderName)); // e.g. uploads/userImages
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });
}

// Separate uploaders for each folder
const userUpload = multer({ storage: createStorage("userImages") });
const memberUpload = multer({ storage: createStorage("memberImages") });
const productUpload = multer({ storage: createStorage("productImages") });

module.exports = {
  userUpload,
  memberUpload,
  productUpload,
};
