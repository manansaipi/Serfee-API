// Import dependencies
const express = require("express");
const Middleware = require("../middleware/firebase_auth");

// Import controller functions
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    uploadUserPhoto
} = require("../controller/users");
const upload = require("../middleware/multer");

const router = express.Router();

// CREATE user - POST
router.post("/", createUser);

// READ all users - GET
router.get("/", getAllUsers);

// READ user by ID - GET
router.get("/:id", getUserById);

// UPDATE user by firebase_uid
router.patch("/", Middleware.authMiddleware, updateUserById);

// DELETE user by ID - DELETE
router.delete("/:id", deleteUserById);

// UPLOAD user photo to Cloud SQL and update user photoURL in firebase
router.post("/uploadPhoto", Middleware.authMiddleware, upload.single("photo"), uploadUserPhoto);

module.exports = router;
