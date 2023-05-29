// Import dependencies
const geolib = require("geolib");

const TaskResponseModel = require("../models/response");
const UsersModel = require("../models/users");

const createOffering = async (req, res) => {
  // get firebase_uid from access token to get user id in table sql
  const firebase_uid = req.user.uid;
  const { body } = req;
  const message = body.message;
  const request_id = body.request_id;
  try {
    // get user_id in table sql
    const [data] = await UsersModel.getUser_id(firebase_uid);
    const user_id = data[0].user_id;
    // create an offering as a tasker
    await TaskResponseModel.createOffering(user_id, request_id, message);
    // triger notification to send to user mobile here
    return res.status(201).json({
      message: "Create offering success",
      tasker_id: user_id,
      body,
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
  // get tasker location latitude and longitude
  const tasker_latitude = body.latitude;
  const tasker_longitude = body.longitude;
  // radius (filter) in km
  const radius = body.radius;
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

const cancelOffer = async (req, res) => {
  const requestId = req.params.id;

  try {
    const cancelledRequest = await TaskResponseModel.cancelOffer(requestId);

    if (!cancelledRequest) {
      return res.status(404).json({
        message: "Task request not found",
        data: null,
      });
    }

    return res.json({
      message: "Cancel task request success",
      data: cancelledRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const acceptOffer = async (req, res) => {
  const requestId = req.params.id;

  try {
    const acceptedRequest = await TaskResponseModel.acceptOffer(requestId);

    if (!acceptedRequest) {
      return res.status(404).json({
        message: "Task request not found",
        data: null,
      });
    }

    return res.json({
      message: "Accept task request success",
      data: acceptedRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createOffering,
  getAllNearTasks,
  cancelOffer,
  acceptOffer,
  getTaskRequestsByTaskId,
  updateTaskRequestStatus,
  deleteTaskRequestById,
};
