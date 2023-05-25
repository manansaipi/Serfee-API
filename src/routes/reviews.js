// Import dependencies
const express = require("express");

const ReviewsController = require("../controller/reviews");

// Middleware
const Middleware = require("../middleware/firebase_auth");

const router = express.Router();

router.post("/", Middleware.authenticate, ReviewsController.createFeedback);

module.exports = router;