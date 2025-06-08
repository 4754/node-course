const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(" __dirname + '/uploads'", path.join(process.cwd(), 'uploads'))
    cb(null,path.join(process.cwd(), 'uploads'))
  },
  filename: function (req, file, cb) {
    console.log("file.fieldname + '-' + Date.now()+ path.extname(file.originalname)",file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
  }
})

const validateFileType = (req,file,cb) =>{
    if( file.mimetype.startsWith("image")){
        cb(null,true)
    } else {
        // cb(null, false)
        cb(new Error('Not an Image!, Please upload only image.'))
    }
}

module.exports = multer({
  storage: storage,
  fileFilter: validateFileType,
  limits: {
    fieldNameSize:  5 * 1024 * 1024,
  },
})