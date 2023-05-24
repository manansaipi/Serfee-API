const dbPool = require("../config/mysql");

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

const createOffering = (user_id, request_id, message) => {
    const SQLQuery = `INSERT INTO Offers (user_id, request_id, message) VALUES ('${user_id}', '${request_id}', '${message}')`;
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

module.exports = {
    getAllNearTasks,
    getTaskRequestsByTaskId,
    createOffering,
    updateTaskRequestStatus,
    deleteTaskRequestById,
};