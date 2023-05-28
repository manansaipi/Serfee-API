// Import dependencies
const express = require("express");

// Middleware
const Middleware = require("../middleware/firebase_auth");
const upload = require("../middleware/multer");

// Import controller functions
const {
    getAllUsers,
    getUserById,
    updateUserById,
} = require("../controller/users");

const router = express.Router();

// READ all users - GET
router.get("/", getAllUsers);

// READ user by ID - GET
router.get("/current", Middleware.authenticate, getUserById);

// UPDATE user by firebase_uid
router.patch("/", Middleware.authenticate, upload.single("photo"), updateUserById);

// READ user by ID - GET
router.get("/profileComplete", Middleware.authenticate); // fix

module.exports = router;
