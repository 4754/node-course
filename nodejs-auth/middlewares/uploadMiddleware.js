const multer = require("multer");
const path = require("path");
const fs = require("fs")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const validateFileType = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // cb(null, false)
    cb(new Error("Not an Image!, Please upload only image."));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: validateFileType,
  limits: {
    fieldNameSize: 5 * 1024 * 1024,
  },
});
