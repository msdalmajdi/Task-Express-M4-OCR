const multer = require('multer');

const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});
const path = require('path');

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Initialize upload variable
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
