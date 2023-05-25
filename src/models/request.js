const dbPool = require("../config/mysql");

const getAllMyTasks = (user_id) => {
    const SQLQuery = `SELECT * FROM Requests WHERE user_id = '${user_id}'`;
    return dbPool.execute(SQLQuery);
};

const myCurrentTask = (user_id) => {
    const SQLQuery = `SELECT * FROM Requests WHERE user_id = '${user_id}' AND status = "Active"`;
    return dbPool.execute(SQLQuery);
};

const createTask = (user_id, body, image_url) => {
    const {
        category_id, description, latitude, longtitude
    } = body;
    const SQLQuery = `INSERT INTO Requests ( user_id, category_id, description, location_latitude, location_longitude, image_url, created_at) VALUES ('${user_id}','${category_id}', '${description}', '${latitude}', '${longtitude}','${image_url}', NOW() )`;
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

const getResponseProfile = (offer_id) => {
    const SQLQuery = `SELECT *
                        FROM Users
                        WHERE user_id = (SELECT user_id FROM Offers WHERE offer_id = '${offer_id}' AND status = "Active");`;
    return dbPool.execute(SQLQuery);
};

const serchTasks = (keyword) => {
    const SQLQuery = `SELECT * FROM tasks WHERE taskName LIKE '%${keyword}' OR description LIKE '${keyword}'`;
    return dbPool.execute(SQLQuery);
};
module.exports = {
    getAllMyTasks,
    myCurrentTask,
    createTask,
    updateTaskById,
    deleteTaskById,
    getResponseProfile,
    serchTasks,
};
