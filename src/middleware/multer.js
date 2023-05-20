const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images"); // store in public/images before upload to CloudSQL
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime(); // get time stamp
        const userEmail = req.user.email;

        cb(null, `${timestamp}-${userEmail}`); // save filename with this format
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 3 * 1000 * 1000 // 3 MB
    }
});

module.exports = upload;
