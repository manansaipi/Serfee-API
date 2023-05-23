const express = require("express");

const router = express.Router();
const TaskRequestController = require("../controller/request");
const TaskResponseController = require("../controller/response");

// Middleware
const Middleware = require("../middleware/firebase_auth");
const upload = require("../middleware/multer");

// Request (user)
// request task and upload task image into cloud storage
router.post("/request", Middleware.authenticate, upload.single("photo"), TaskRequestController.createTask);
router.get("/request", TaskRequestController.getAllMyTasks);
router.get("/my", Middleware.authenticate, TaskRequestController.getTaskById);
router.put("/request:id", TaskRequestController.updateTaskById);
router.delete("/request:id", TaskRequestController.deleteTaskById);

// Tasker
router.post("/response", TaskResponseController.createTaskRequest);
router.get("/response", Middleware.authenticate, TaskResponseController.getAllNearTasks);
router.get("/response/task/:task_id", TaskResponseController.getTaskRequestsByTaskId);
router.put("/response/:id", TaskResponseController.updateTaskRequestStatus);
router.delete("/response/:id", TaskResponseController.deleteTaskRequestById);

// search task
router.get("/search", TaskRequestController.seacrhTasks);

module.exports = router;