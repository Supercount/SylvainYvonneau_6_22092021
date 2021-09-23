const multer = require('multer');



const storage = multer.diskStorage({
    destination: path.join(__dirname, "/public/uploads"),
    filename: function (req, file, cb) {
       const fullName =
          "blog_" + uuid4().replace(/-/g, "") +
          path.extname(file.originalname);
          cb(null, fullName);
    },
 });
 const upload = multer({ storage: storage });

 module.exports = upload;