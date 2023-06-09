// Import dependencies
const geolib = require("geolib");

const TaskResponseModel = require("../models/response");
const UsersModel = require("../models/users");

const getAllTask = async (req, res) => {
    try {
        const [listStory] = await TaskResponseModel.getAllTask();
        res.json({
            message: "get all task",
            listStory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server serror",
            error
        });  
    }
};

const createOffering = async (req, res) => {
    // get firebase_uid from access token to get user id in table sql
    const firebase_uid = req.user.uid;
    const message = req.body.message;
    const request_id = req.body.request_id;
    try {
    // get user_id in table sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = data[0].user_id;
        // create an offering as a tasker
        await TaskResponseModel.createOffering(user_id, request_id, message);
        // triger notification to send to user mobile here
        return res.status(201).json({
            messages: "Create offering success",
            tasker_id: user_id,
            message,
            request_id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};
// Tasker
const getAllNearTasks = async (req, res) => {
    // get tasker location latitude and longitude
    const tasker_latitude = req.body.latitude;
    const tasker_longitude = req.body.longitude;
    // radius (filter) in km
    const radius = req.body.radius;
    try {
        const [tasks] = await TaskResponseModel.getAllNearTasks(
            tasker_latitude,
            tasker_longitude,
            radius
        );
        if (tasks !== "") {
            // get task location latitude and longitude
            const task_latitude = tasks[0].location_latitude;
            const task_longitude = tasks[0].location_longitude;
            // asign tasker and task location
            const tasker_location = {
                latitude: tasker_latitude,
                longitude: tasker_longitude,
            };
            const task_location = {
                latitude: task_latitude,
                longitude: task_longitude,
            };
            // get distance between tasker and  task
            const distance = geolib.getDistance(tasker_location, task_location);
            return res.json({
                message: "GET all near tasks",
                data: tasks,
                distance,
            });
        }
        return res.send({ message: "no task in ur location" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

const getTaskRequestsByTaskId = async (req, res) => {
    const taskId = req.params.id;
    try {
        const [data] = await TaskResponseModel.getTaskRequestsByTaskId(taskId);
        return res.json({
            message: "GET task requests by task ID",
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getAllMyOffer = async (req, res) => {
    const firebase_uid = req.user.uid;
    try {
        // get user_id in db sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        const [offers] = await TaskResponseModel.getAllMyOffer(user_id);
        if (offers === "") {
            return res.json({
                message: "Do not have any offering yet"
            });
        }
        return res.json({
            message: "GET all my recent offer",
            data: offers
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getMyOffer = async (req, res) => {
    const firebase_uid = req.user.uid;
    try {
        // get user_id in db sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        const [offer] = await TaskResponseModel.myCurrentOffer(user_id);
        if (offer === "") {
            return res.json({
                message: "Do not have active any offer"
            });
        }
        return res.json({
            message: "Get my current offer",
            data: offer,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const completeTask = async (req, res) => {
    const offer_id = req.params.id;
    try {
        await TaskResponseModel.completeTask(offer_id);
        return res.json({
            message: "Update task request status success",
            offer_id
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const cancelOffer = async (req, res) => {
    const offer_id = req.params.id;
    try {
        const cancelledRequest = await TaskResponseModel.cancelOffer(offer_id);

        if (!cancelledRequest) {
            return res.status(404).json({
                message: "Task request not found",
                data: null,
            });
        }

        return res.json({
            message: "Cancel offer success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

module.exports = {
    getAllTask,
    createOffering,
    getAllNearTasks,
    cancelOffer,
    getMyOffer,
    getAllMyOffer,
    getTaskRequestsByTaskId,
    completeTask,
};
