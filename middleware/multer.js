const multer = require('multer');

const mimeTypes = {
   'image/jpg': 'jpg',
   'image/jpeg': 'jpg',
   'image/png': 'png',
   'image/bmp': 'bmp',
   'image/gif': 'gif'
};

const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      callback(null, 'images')
   },
   filename: function (req, file, callback) {
      const name = file.originalname.split(' ').join('_') + Date.now();
      const extention = mimeTypes.value(file.mimetype);
      callback(null, name + '.' + extention);
   }
})

const upload = multer({ storage: storage }).single('image');

module.exports = upload;