const dbPool = require("../config/mysql");

const getAllTasks = () => {
    const SQLQuery = "SELECT * FROM tasks";
    return dbPool.execute(SQLQuery);
};

const getTaskById = (taskId) => {
    const SQLQuery = `SELECT * FROM tasks WHERE task_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const createTask = (taskData) => {
    const {
        taskName, description, customerId, latitude, longitude 
    } = taskData;
    const SQLQuery = `INSERT INTO tasks (taskName, description, customerId, latitude, longitude) VALUES ('${taskName}', '${description}', '${customerId}', '${latitude}', '${longitude}')`;
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

const getAllTaskRequests = () => {
    const SQLQuery = "SELECT * FROM task_requests";
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

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    getAllTaskRequests,
    getTaskRequestsByTaskId,
    createTaskRequest,
    updateTaskRequestStatus,
    deleteTaskRequestById,
};
