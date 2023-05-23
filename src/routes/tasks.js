const express = require("express");

const router = express.Router();
const controller = require("../controller/tasks");

// Middleware
const Middleware = require("../middleware/firebase_auth");
const upload = require("../middleware/multer");

// Request (user)
// request task and upload task image into cloud storage
router.post("/user", Middleware.authenticate, upload.single("photo"), controller.createTask);
router.get("/user", controller.getAllTasks);
router.get("/user:id", controller.getTaskById);
router.put("/user:id", controller.updateTaskById);
router.delete("/user:id", controller.deleteTaskById);

// Tasker
router.post("/tasker", controller.createTaskRequest);
router.get("/tasker", controller.getAllNearTasks);
router.get("/tasker/task/:task_id", controller.getTaskRequestsByTaskId);
router.put("/tasker/:id", controller.updateTaskRequestStatus);
router.delete("/tasker/:id", controller.deleteTaskRequestById);

// search task
router.get("/search", controller.seacrhTasks);

module.exports = router;