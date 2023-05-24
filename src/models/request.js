const dbPool = require("../config/mysql");

const getAllTasks = () => {
    const SQLQuery = "SELECT * FROM Requests";
    return dbPool.execute(SQLQuery);
};

const myCurrentTask = (user_id) => {
    const SQLQuery = `SELECT * FROM Requests WHERE user_id = '${user_id}' AND status = "Available"`;
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

const serchTasks = (keyword) => {
    const SQLQuery = `SELECT * FROM tasks WHERE taskName LIKE '%${keyword}' OR description LIKE '${keyword}'`;
    return dbPool.execute(SQLQuery);
};
module.exports = {
    getAllTasks,
    myCurrentTask,
    createTask,
    updateTaskById,
    deleteTaskById,
    serchTasks,
};
