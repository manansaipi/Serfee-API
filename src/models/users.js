const dbPool = require("../config/mysql");

const getAllUsers = () => {
    const SQLQuery = "SELECT * FROM users";
    return dbPool.execute(SQLQuery);
};

const getUser = (id) => {
    const SQLQuery = `SELECT * FROM users WHERE id = '${id}'`;
    return dbPool.execute(SQLQuery);
};

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (full_name, email) VALUES ('${body.full_name}', '${body.email}')`;
    return dbPool.execute(SQLQuery);
};

const updateUser = (firebase_uid, displayName) => {
    const SQLQuery = `UPDATE users SET full_name = '${displayName}' WHERE firebase_uid = '${firebase_uid}'`;
    return dbPool.execute(SQLQuery);
};

const deleteUser = (firebase_uid) => {
    const SQLQuery = `DELETE FROM users WHERE firebase_uid = '${firebase_uid}'`;
    return dbPool.execute(SQLQuery);
};

const createNewUserWhenRegister = (firebase_uid, userName, email) => {
    const SQLQuery = `INSERT INTO users (firebase_uid, user_name, email) VALUES ('${firebase_uid}', '${userName}', '${email}')`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
    createNewUserWhenRegister
};