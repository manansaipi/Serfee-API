const dbPool = require("../config/mysql");

const getAllUsers = () => {
    const SQLQuery = "SELECT * FROM Users";
    return dbPool.execute(SQLQuery);
};

const getUser = (firebase_uid) => {
    const SQLQuery = `SELECT * FROM Users WHERE firebase_uid = '${firebase_uid}'`;
    return dbPool.execute(SQLQuery);
};

const updateUser = (firebase_uid, body, photo_url) => {
    const SQLQuery = `UPDATE Users SET full_name = '${body.displayName}', email = '${body.email}', phone_number = '${body.phoneNumber}', photo_url = '${photo_url}' WHERE firebase_uid = '${firebase_uid}'`;
    return dbPool.execute(SQLQuery);
};

const createNewUserWhenRegister = (firebase_uid, name, email) => {
    const SQLQuery = `INSERT INTO Users (firebase_uid, full_name, email) VALUES ('${firebase_uid}', '${name}', '${email}')`;
    return dbPool.execute(SQLQuery);
};

const getUser_id = (firebase_uid) => {
    const SQLQuery = `SELECT user_id FROM Users WHERE firebase_uid = '${firebase_uid}'`;
    return dbPool.execute(SQLQuery);
};
const deleteUser = (firebase_uid) => {
    const SQLQuery = `DELETE FROM Users WHERE firebase_uid = '${firebase_uid}'`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    createNewUserWhenRegister,
    getUser_id,
    deleteUser
};