// Import dependencies
const fs = require("fs");

const TaskRequestModel = require("../models/request");
const UsersModel = require("../models/users");
const cloudStorageConfig = require("../config/cloud-storage");

// This function will upload task image to Cloud Storage
const uploadTaskImage = async (file) => {
    const destination = `images/task/${file.filename}`; // path to save in the bucket and the file name
    const fileObject = cloudStorageConfig.bucket.file(destination);
    const filePath = `./public/images/${file.filename}`; // path to acces images in local

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
    const publicUrl = `https://storage.googleapis.com/${cloudStorageConfig.bucketName}/${destination}`;
    return publicUrl;
};

const createTask = async (req, res) => {
    // get firebase_uid from authMiddleware using authorization access token to get user information in db sql 
    const firebase_uid = req.user.uid; 
    const { body } = req;
    const category = body.category;
    let image_url; // define var to asign image_url if any
    try {
        if (req.file != null) { // if the request contain a file then upload image to cloud storage
            const file = req.file; // get file in body->form-data
            image_url = await uploadTaskImage(file); // take the umage_url
        }
        const [cat] = await TaskRequestModel.getCatId(category);
        const category_id = (cat[0].category_id);
        // get user_id in db sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        await TaskRequestModel.createTask(user_id, body, image_url, category_id);
        console.log("create task!");
        return res.status(201).json({
            messatt: "Create new task success",
            creator_id: user_id,
            data: body,
            image_url
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

const getAllMyTasks = async (req, res) => {
    const firebase_uid = req.user.uid;
    try {
        // get user_id in db sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        const [tasks] = await TaskRequestModel.getAllMyTasks(user_id);
        return res.json({
            message: "GET all my recent tasks",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const getMyTask = async (req, res) => {
    const firebase_uid = req.user.uid;
    try {
        // get user_id in db sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        const [task] = await TaskRequestModel.myCurrentTask(user_id);
        return res.json({
            message: "Get my current task",
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
        const updatedTask = await TaskRequestModel.updateTaskById(taskId, body);
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
                data: null,
            });
        }
        return res.json({
            message: "Update task success",
            body
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const cancelMyTask = async (req, res) => {
    const requestId = req.params.id;
    try {
        const cancelledRequest = await TaskRequestModel.cancelMyTask(requestId);

        if (!cancelledRequest) {
            return res.status(404).json({
                message: "Task request not found",
                data: null,
            });
        }

        return res.json({
            message: "Cancel my task success",
            requestId
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

// should add notification when got response or after tasker create an offering
const getResponseProfile = async (req, res) => {
    const { body } = req;
    // const tasker_id = body.tasker_id;
    const offer_id = body.offer_id;
    console.log(offer_id);
    try {
        const [tasker_profile] = await TaskRequestModel.getResponseProfile(offer_id);
        return res.json({
            message: "Get response",
            tasker_profile,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};
// when user accept/reject tasker. update status
const response = async (req, res) => {
    const request_id = req.body.request_id;
    const offer_id = req.body.offer_id;
    // response would be Accept or Reject
    const respon = req.body.response;
    try {
        if (respon === "Accept") {
            console.log(respon);
            await TaskRequestModel.acceptOffer(request_id, offer_id);
            return res.json({
                message: "Accept task request success",
                request_id
            });
            // if not accept(reject)
        } 
        await TaskRequestModel.rejectOffer(request_id, offer_id);
        return res.json({
            message: "Reject task request success",
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

const seacrhTasks = async (req, res) => {
    const { keyword } = req.query;

    try {
        const tasks = await TaskRequestModel.serchTasks(keyword);
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

const getCaetegory = async (req, res) => {
    try {
        const [category] = await TaskRequestModel.getCategory();
        res.json({
            message: "get category",
            category
        });
    } catch (error) {
        console.log(error);
        res.send.status(500).json({
            message: "server Error",
            serverMessage: error
        });
    }
};

module.exports = {
    createTask,
    uploadTaskImage,
    getAllMyTasks,
    getMyTask,
    updateTaskById,
    cancelMyTask,
    getResponseProfile,
    response,
    seacrhTasks,
    getCaetegory
};
