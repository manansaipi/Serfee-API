// Import dependencies
const express = require("express");

// Middleware
const authController = require("../controller/auth");
const Middleware = require("../middleware/firebase_auth");

const router = express.Router();

router.get("/login", authController.login);

router.post("/register", authController.register);

router.get("/logout", Middleware.authenticate, authController.logout);

router.delete("/delete-account", Middleware.authenticate, authController.deleteAccount);

module.exports = router;
