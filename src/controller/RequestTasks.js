// Import dependencies
const TaskModel = require("../models/RequestTaskModel");
const TaskRequestModel = require("../models/RequestTaskModel");

const createTask = async (req, res) => {
    const { body } = req;

    if (!body.taskName || !body.description || !body.customerId) {
        return res.status(400).json({
            message: "Invalid input value",
            data: null,
        });
    }

    try {
        const task = await TaskModel.createTask(body);
        return res.status(201).json({
            message: "Create new task success",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.getAllTasks();
        return res.json({
            message: "GET all tasks",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await TaskModel.getTaskById(taskId);
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
                data: null,
            });
        }
        return res.json({
            message: "Get task success",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const updateTaskById = async (req, res) => {
    const taskId = req.params.id;
    const { body } = req;
    try {
        const updatedTask = await TaskModel.updateTaskById(taskId, body);
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
                data: null,
            });
        }
        return res.json({
            message: "Update task success",
            data: updatedTask,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const deleteTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const deletedTask = await TaskModel.deleteTaskById(taskId);
        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found",
                data: null,
            });
        }
        return res.json({
            message: "Delete task success",
            data: deletedTask,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const createTaskRequest = async (req, res) => {
    const { body } = req;

    if (!body.task_id || !body.tasker_id) {
        return res.status(400).json({
            message: "Invalid input value",
            data: null,
        });
    }

    try {
        const request = await TaskRequestModel.createTaskRequest(body);
        return res.status(201).json({
            message: "Create new task request success",
            data: request,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getAllTaskRequests = async (req, res) => {
    try {
        const requests = await TaskRequestModel.getAllTaskRequests();
        return res.json({
            message: "GET all task requests",
            data: requests,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getTaskRequestsByTaskId = async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const requests = await TaskRequestModel.getTaskRequestsByTaskId(taskId);
        return res.json({
            message: "GET task requests by task ID",
            data: requests,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const updateTaskRequestStatus = async (req, res) => {
    const requestId = req.params.id;
    const { body } = req;
    try {
        const updatedRequest = await TaskRequestModel.updateTaskRequestStatus(
            requestId,
            body.status
        );
        if (!updatedRequest) {
            return res.status(404).json({
                message: "Task request not found",
                data: null,
            });
        }
        return res.json({
            message: "Update task request status success",
            data: updatedRequest,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const deleteTaskRequestById = async (req, res) => {
    const requestId = req.params.id;
    try {
        const deletedRequest = await TaskRequestModel.deleteTaskRequestById(
            requestId
        );
        if (!deletedRequest) {
            return res.status(404).json({
                message: "Task request not found",
                data: null,
            });
        }
        return res.json({
            message: "Delete task request success",
            data: deletedRequest,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const seacrhTasks = async (req, res) => {
    const { keyword } = req.query;

    try {
        const tasks = await TaskModel.serchTasks(keyword);
        return res.json({
            message: "Search tasks success",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    createTaskRequest,
    getAllTaskRequests,
    getTaskRequestsByTaskId,
    updateTaskRequestStatus,
    deleteTaskRequestById,
    seacrhTasks,
};
