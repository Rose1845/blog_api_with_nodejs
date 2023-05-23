const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const filename=`${new Date().getTime()}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + "-" + filename);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
