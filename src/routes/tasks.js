const express = require("express");

const router = express.Router();
const TaskRequestController = require("../controller/request");
const TaskResponseController = require("../controller/response");

// Middleware
const Middleware = require("../middleware/firebase_auth");
const upload = require("../middleware/multer");

/* Request (user) */
// request task and upload task image into cloud storage
router.post("/request", Middleware.authenticate, upload.single("photo"), TaskRequestController.createTask);
// get my active task
router.get("/request/active", Middleware.authenticate, TaskRequestController.getMyTask);
// get all my recent task
router.get("/request/all", Middleware.authenticate, TaskRequestController.getAllMyTasks);
// get tasker profile if tasker give an offering
router.get("/getresponse", Middleware.authenticate, TaskRequestController.getResponseProfile);
// edit my active task
router.patch("/request/:id", Middleware.authenticate, TaskRequestController.updateTaskById);
// cancel my task
router.patch("/request/cancel/:id", Middleware.authenticate, TaskRequestController.cancelMyTask);
// accept or reject offering from tasker (response from user)
router.patch("/request", Middleware.authenticate, TaskRequestController.response);

/* Response (Tasker) */
// tasker get all near task
router.get("/response", Middleware.authenticate, TaskResponseController.getAllNearTasks);
// get task by id, when tasker click task on the map
router.get("/respons/:id", Middleware.authenticate, TaskResponseController.getTaskRequestsByTaskId);
// Tasker give an offering to request / apply task
router.post("/response", Middleware.authenticate, TaskResponseController.createOffering);
// get my active task
router.get("/response/active", Middleware.authenticate, TaskResponseController.getMyOffer);
// get all my recent task
router.get("/response/all", Middleware.authenticate, TaskResponseController.getAllMyOffer);
// Cancel offer
router.patch("/response/cancel/:id", Middleware.authenticate, TaskResponseController.cancelOffer);
// complete task / mark as complete
router.patch("/response/complete/:id", Middleware.authenticate, TaskResponseController.completeTask);

// search task
router.get("/search", TaskRequestController.seacrhTasks);

module.exports = router;