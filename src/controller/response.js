// Import dependencies

const TaskResponseModel = require("../models/request");

const createTaskRequest = async (req, res) => {
    const { body } = req;

    if (!body.task_id || !body.tasker_id) {
        return res.status(400).json({
            message: "Invalid input value",
            data: null,
        });
    }

    try {
        const request = await TaskResponseModel.createTaskRequest(body);
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
// Tasker
const getAllNearTasks = async (req, res) => {
    const { body } = req;
    const tasker_latitude = body.latitude;
    const tasker_longtitude = body.longtitude;
    const distance = body.distance;
    try {
        const [tasks] = await TaskResponseModel.getAllNearTasks(tasker_latitude, tasker_longtitude, distance);
        return res.json({
            message: "GET all tasks",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

const getTaskRequestsByTaskId = async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const requests = await TaskResponseModel.getTaskRequestsByTaskId(taskId);
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
        const updatedRequest = await TaskResponseModel.updateTaskRequestStatus(
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
        const deletedRequest = await TaskResponseModel.deleteTaskRequestById(
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

module.exports = {
    createTaskRequest,
    getAllNearTasks,
    getTaskRequestsByTaskId,
    updateTaskRequestStatus,
    deleteTaskRequestById,
};
