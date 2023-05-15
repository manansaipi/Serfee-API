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

const updateUser = (body, id) => {
    const SQLQuery = `UPDATE users SET name = '${body.name}', username = '${body.username}', email = '${body.email}' WHERE id = '${id}'`;
    return dbPool.execute(SQLQuery);
};
const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM users WHERE id = '${id}'`;
    return dbPool.execute(SQLQuery);
};

const createNewUserWhenRegister = (fName, email) => {
    const SQLQuery = `INSERT INTO users (full_name, email) VALUES ('${fName}', '${email}')`;
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