const multer = require("multer");

const upload = multer({
    limits: {
        fileSize: 3 * 1000 * 1000 // 3 MB
    }
});

module.exports = upload;
