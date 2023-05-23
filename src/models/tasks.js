const dbPool = require("../config/mysql");

const getAllTasks = () => {
    const SQLQuery = "SELECT * FROM Requests";
    return dbPool.execute(SQLQuery);
};

const getTaskById = (taskId) => {
    const SQLQuery = `SELECT * FROM tasks WHERE task_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const createTask = (user_id, body, image_url) => {
    const {
        service_id, description, latitude, longtitude
    } = body;
    const SQLQuery = `INSERT INTO Requests ( user_id, service_id, description, location_latitude, location_longitude, image_url) VALUES ('${user_id}','${service_id}', '${description}', '${latitude}', '${longtitude}','${image_url}' )`;
    return dbPool.execute(SQLQuery);
};  

const updateTaskById = (taskId, taskData) => {
    const {
        taskName, description, customerId, latitude, longitude 
    } = taskData;
    const SQLQuery = `UPDATE tasks SET task_name = '${taskName}', description = '${description}', customerId = '${customerId}', latitude = '${latitude}', longitude = '${longitude}' WHERE task_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const deleteTaskById = (taskId) => {
    const SQLQuery = `DELETE FROM tasks WHERE task_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const getAllNearTasks = (tasker_latitude, tasker_longtitude, distance) => {
    // get all near task from tasker location within 1km
    const SQLQuery = `SELECT *
                        FROM Requests
                        WHERE (
                            6371 * acos(
                                cos(radians(location_latitude)) * cos(radians(${tasker_latitude})) *
                                cos(radians(${tasker_longtitude}) - radians(location_longitude)) +
                                sin(radians(location_latitude)) * sin(radians(${tasker_latitude}))
                            )
                        ) <= ${distance};`;
    return dbPool.execute(SQLQuery);
};

const getTaskRequestsByTaskId = (taskId) => {
    const SQLQuery = `SELECT * FROM task_requests WHERE task_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const createTaskRequest = (requestData) => {
    const { taskId, taskerId } = requestData;
    const SQLQuery = `INSERT INTO task_requests (taskId, taskerId) VALUES ('${taskId}', '${taskerId}')`;
    return dbPool.execute(SQLQuery);
};

const updateTaskRequestStatus = (requestId, status) => {
    const SQLQuery = `UPDATE task_requests SET status = '${status}' WHERE request_id = '${requestId}'`;
    return dbPool.execute(SQLQuery);
};

const deleteTaskRequestById = (requestId) => {
    const SQLQuery = `DELETE FROM task_requests WHERE request_id = '${requestId}'`;
    return dbPool.execute(SQLQuery);
};
const serchTasks = (keyword) => {
    const SQLQuery = `SELECT * FROM tasks WHERE taskName LIKE '%${keyword}' OR description LIKE '${keyword}'`;
    return dbPool.execute(SQLQuery);
};
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    getAllNearTasks,
    getTaskRequestsByTaskId,
    createTaskRequest,
    updateTaskRequestStatus,
    deleteTaskRequestById,
    serchTasks,
};
