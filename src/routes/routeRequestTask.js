const express = require("express");

const router = express.Router();
const controller = require("../controller/RequestTasks");

// Middleware
const Middleware = require("../middleware/firebase_auth");
const upload = require("../middleware/multer");

// Task routes
// request task and upload task image into cloud storage
router.post("/", Middleware.authenticate, upload.single("photo"), controller.createTask);
router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.put("/:id", controller.updateTaskById);
router.delete("/:id", controller.deleteTaskById);

// Task request routes
router.post("/task-requests", controller.createTaskRequest);
router.get("/task-requests", controller.getAllTaskRequests);
router.get("/task-requests/task/:task_id", controller.getTaskRequestsByTaskId);
router.put("/task-requests/:id", controller.updateTaskRequestStatus);
router.delete("/task-requests/:id", controller.deleteTaskRequestById);

module.exports = router;