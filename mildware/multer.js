const multer = require('multer');
const path = require('path');

// Storage engine setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/'); // Adjust path as necessary
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initiate multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit (adjust as needed)
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('productImage'); // Single file upload with the field name 'productImage'


// Check file type
function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check the extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check the MIME type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

module.exports = upload;
