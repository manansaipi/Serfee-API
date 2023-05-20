const express = require("express");

const router = express.Router();
const controller = require("../controller/RequestTasks");

// Middleware
const Middleware = require("../middleware/firebase_auth");

// Task routes
router.post("/tasks", Middleware.authenticate, controller.createTask);
router.get("/tasks", controller.getAllTasks);
router.get("/tasks/:id", controller.getTaskById);
router.put("/tasks/:id", controller.updateTaskById);
router.delete("/tasks/:id", controller.deleteTaskById);

// Task request routes
router.post("/task-requests", controller.createTaskRequest);
router.get("/task-requests", controller.getAllTaskRequests);
router.get("/task-requests/task/:task_id", controller.getTaskRequestsByTaskId);
router.put("/task-requests/:id", controller.updateTaskRequestStatus);
router.delete("/task-requests/:id", controller.deleteTaskRequestById);

module.exports = router;