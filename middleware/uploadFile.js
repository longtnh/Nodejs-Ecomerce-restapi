const multer = require('multer')

//multer upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './assets/image');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const fileFilter = function (req, file, cb) {
  var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb({
          success: false,
          message: 'Invalid file type. Only jpg, png image files are allowed.'
      }, false);
  }
}

const obj = {
  storage: storage,
  limits: {
      fileSize: 1024 * 1024
  },
  fileFilter: fileFilter
}

const uploadImg = multer(obj).single('img')

module.exports = {uploadImg}