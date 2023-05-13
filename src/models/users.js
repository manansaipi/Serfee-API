const dbPool = require("../config/mysql");

const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (full_name, email) VALUES ('${body.full_name}', '${body.email}')`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createNewUser
};