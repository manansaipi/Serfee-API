// Import dependencies
const express = require("express");

const router = express.Router();

// Import controller functions
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require("../controller/users");

// CREATE user - POST
router.post("/", createUser);

// READ all users - GET
router.get("/", getAllUsers);

// READ user by ID - GET
router.get("/:id", getUserById);

// UPDATE user by ID - PUT
router.put("/:id", updateUserById);

// DELETE user by ID - DELETE
router.delete("/:id", deleteUserById);

module.exports = router;
