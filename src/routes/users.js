// Import dependencies
const express = require("express");
const Middleware = require("../middleware/firebase_auth");

// Import controller functions
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require("../controller/users");

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

module.exports = router;
