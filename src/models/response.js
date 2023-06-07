const dbPool = require("../config/mysql");

const getAllNearTasks = (tasker_latitude, tasker_longitude, radius) => {
    // get all near task from tasker location within 1km
    const SQLQuery = `SELECT *
                        FROM Requests
                        WHERE (
                            6371 * acos(
                                cos(radians(location_latitude)) * cos(radians(${tasker_latitude})) *
                                cos(radians(${tasker_longitude}) - radians(location_longitude)) +
                                sin(radians(location_latitude)) * sin(radians(${tasker_latitude}))
                            )
                        ) <= ${radius};`;
    return dbPool.execute(SQLQuery);
};

const getAllTask = (tasker_latitude, tasker_longitude, radius) => {
    // get all near task from tasker location within 1km
    const SQLQuery = `SELECT Requests.*, Users.full_name
                  FROM Requests
                  JOIN Users ON Requests.user_id = Users.user_id`;
    return dbPool.execute(SQLQuery);
};

const getTaskRequestsByTaskId = (taskId) => {
    const SQLQuery = `SELECT * FROM Requests WHERE request_id = '${taskId}'`;
    return dbPool.execute(SQLQuery);
};

const createOffering = (user_id, request_id, message) => {
    const SQLQuery = `INSERT INTO Offers (user_id, request_id, message, created_at) VALUES ('${user_id}', '${request_id}', '${message}', NOW())`;
    // update task request status become Offering when tasker offer this task
    const updateReqStatus = `UPDATE Requests SET status = 'Offering' WHERE request_id = '${request_id}'`;
    dbPool.execute(updateReqStatus);
    return dbPool.execute(SQLQuery);
};

const myCurrentOffer = (user_id) => {
    const SQLQuery = `SELECT * FROM Offers WHERE user_id = '${user_id}' AND status = "Active" OR status = "In Progress"`;
    return dbPool.execute(SQLQuery);
};

const getAllMyOffer = (user_id) => {
    const SQLQuery = `SELECT * FROM Offers WHERE user_id = '${user_id}'`;
    return dbPool.execute(SQLQuery);
};

const completeTask = (offer_id) => {
    const SQLQueryOffer = `UPDATE Offers SET status = 'Completed' WHERE offer_id = '${offer_id}'`;
    const SQLQueryReq = `UPDATE Requests SET status = 'Completed' WHERE request_id = (SELECT request_id FROM Offers WHERE offer_id = '${offer_id}')`;
    dbPool.execute(SQLQueryReq);
    return dbPool.execute(SQLQueryOffer);
};

const cancelOffer = (offer_id) => {
    const SQLQuery = `UPDATE Offers SET status = 'Canceled' WHERE offer_id = '${offer_id}'`;
    // update task request status become Active when tasker canceled the offering
    const updateReqStatus = `UPDATE Requests SET status = 'Active' WHERE request_id = (SELECT request_id FROM Offers WHERE offer_id = '${offer_id}')`;
    dbPool.execute(updateReqStatus);
    return dbPool.execute(SQLQuery);
};

module.exports = {
    getAllNearTasks,
    getTaskRequestsByTaskId,
    createOffering,
    myCurrentOffer,
    getAllMyOffer,
    completeTask,
    cancelOffer,
    getAllTask
};