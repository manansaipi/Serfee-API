// Import dependencies
const express = require("express");

// Middleware
const Middleware = require("../middleware/firebase_auth");
const upload = require("../middleware/multer");

// Import controller functions
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    uploadUserPhoto
} = require("../controller/users");

const router = express.Router();

// CREATE user - POST
router.post("/", createUser);

// READ all users - GET
router.get("/", getAllUsers);

// READ user by ID - GET
router.get("/:id", getUserById);

// UPDATE user by firebase_uid
router.patch("/", Middleware.authenticate, updateUserById);

// DELETE user by ID - DELETE
router.delete("/:id", deleteUserById);

// UPLOAD user photo to Cloud SQL and update user photoURL in firebase
router.post("/uploadPhoto", Middleware.authenticate, upload.single("photo"), uploadUserPhoto);

module.exports = router;
