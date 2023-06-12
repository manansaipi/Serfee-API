const dbPool = require("../config/mysql");

const createTask = (user_id, body, image_url, category_id) => {
    const {
        title, description, lat, lon
    } = body;
    const SQLQuery = `INSERT INTO Requests ( user_id, title, category_id, description, location_latitude, location_longitude, image_url, created_at) VALUES ('${user_id}', '${title}' ,'${category_id}', '${description}', '${lat}', '${lon}','${image_url}', NOW() )`;
    return dbPool.execute(SQLQuery);
};  

const getCatId = (category) => {
    const SQLQuery = `SELECT category_id FROM Categories WHERE category_name = '${category}'`;
    return dbPool.execute(SQLQuery);
};

const myCurrentTask = (user_id) => {
    const SQLQuery = `SELECT * FROM Requests WHERE user_id = '${user_id}' AND status = "Active" OR status = "In Progress"`;
    return dbPool.execute(SQLQuery);
};

const getAllMyTasks = (user_id) => {
    const SQLQuery = `SELECT * FROM Requests WHERE user_id = '${user_id}'`;
    return dbPool.execute(SQLQuery);
};
// when user accept/reject tasker. update status
const acceptOffer = (request_id, offer_id) => {
    const SQLQueryReq = `UPDATE Requests SET status = 'In Progress' WHERE request_id = '${request_id}'`;
    const SQLQueryOffer = `UPDATE Offers SET status = 'In Progress' WHERE offer_id = '${offer_id}'`;
    dbPool.execute(SQLQueryReq);
    return dbPool.execute(SQLQueryOffer);
};
const rejectOffer = (request_id, offer_id) => {
    const SQLQueryReq = `UPDATE Requests SET status = 'Active' WHERE request_id = '${request_id}'`;
    const SQLQueryOffer = `UPDATE Offers SET status = 'Rejected' WHERE offer_id = '${offer_id}'`;
    dbPool.execute(SQLQueryReq);
    return dbPool.execute(SQLQueryOffer);
};

const updateTaskById = (taskId, body) => {
    const { title, category_id, description } = body;
    const SQLQuery = `UPDATE Requests SET title = '${title}', category_id = '${category_id}', description = '${description}' WHERE request_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const cancelMyTask = (request_id) => {
    const SQLQuery = `UPDATE Requests SET status = 'Canceled' WHERE request_id = '${request_id}'`;
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

const getCategory = () => {
    const SQLQuery = "SELECT * FROM Categories";
    return dbPool.execute(SQLQuery);
};
module.exports = {
    createTask,
    getCatId,
    myCurrentTask,
    getAllMyTasks,   
    acceptOffer,
    rejectOffer,
    updateTaskById,
    cancelMyTask,
    getResponseProfile,
    serchTasks,
    getCategory
};
