// Import dependencies
const fs = require("fs");

const TaskModel = require("../models/RequestTaskModel");
const TaskRequestModel = require("../models/RequestTaskModel");
const UsersModel = require("../models/users");
const cloudStorageConfig = require("../config/cloud-storage");

// This function will upload task image to Cloud Storage
const uploadTaskImage = async (file) => {
    const destination = `images/task/${file.filename}`; // path to save in the bucket and the file name
    const fileObject = cloudStorageConfig.bucket.file(destination);
    const filePath = `./public/images/${file.filename}`; // path to acces images in local
    
    try {
        const options = {
            metadata: {
                contentType: file.mimetype,
            },
            predefinedAcl: "publicRead", // set public access control in Cloud SQL
        };
        // store photo to Cloud SQL
        await new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(`./public/images/${file.filename}`);
            const writeStream = fileObject.createWriteStream(options);

            readStream.on("error", reject);
            writeStream.on("error", reject);
            writeStream.on("finish", resolve);

            readStream.pipe(writeStream);
        });
        // delete file in public/images directory after upload to Cloud SQL
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${err}`);
            }
        });
        // if success Get the public URL to access the task image
        const publicUrl = `https://storage.googleapis.com/${cloudStorageConfig.bucketName}/${destination}}`;
        return publicUrl;
    } catch (error) {
        return error;
    }
};

const createTask = async (req, res) => {
    // get firebase_uid from authMiddleware using authorization access token to get user information in db sql 
    const firebase_uid = req.user.uid; 
    const { body } = req;
    let image_url; // define var to asign image_url if any
    try {
        if (req.file != null) { // if the request contain a file then upload image to cloud storage
            const file = req.file; // get file in body->form-data
            image_url = "http://test-img-url.com"
            // image_url = uploadTaskImage(file); // take the umage_url
        }
        // get user_id in db sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        await TaskModel.createTask(user_id, body, image_url);
        return res.status(201).json({
            message: "Create new task success",
            creator_id: user_id,
            data: body,
            image_url
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error,
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
    uploadTaskImage,
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
