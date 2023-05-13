// Import dependencies
// Import the database connection pool
const dbPool = require("../config/mysql");

// CREATE a new user
const createUser = async (req, res) => {
    // console.log(req.body)
    const { body } = req

    if (!body.full_name || !body.email) {
        return res.status(400).json({
            message: 'Invalid input value',
            data: null
        })
    }

    try {
        await UsersModel.createNewUser(body)
        return res.status(201).json({
            message: 'CREATE new user success', 
            data: body
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

// READ all users
const getAllUsers = (req, res) => {
  // Define the SQL query
  const sql = "SELECT * FROM users";

  // Execute the query
  dbPool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving users");
    } else {
      res.send(results);
    }
  });
};

// READ a user by ID
const getUserById = (req, res) => {
  // Get the user ID from the request parameters
  const userId = req.params.id;

  // Define the SQL query
  const sql = "SELECT * FROM users WHERE id = ?";

  // Execute the query with the user ID as a parameter
  dbPool.query(sql, userId, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving user");
    } else if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(results[0]);
    }
  });
};

// UPDATE a user by ID
const updateUserById = (req, res) => {
  // Get the user ID from the request parameters
  const userId = req.params.id;

  // Get the updated user data from the request body
  const updatedUserData = req.body;

  // Define the SQL query
  const sql = "UPDATE users SET ? WHERE id = ?";

  // Execute the query with the updated user data and user ID as parameters
  dbPool.query(sql, [updatedUserData, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating user");
    } else if (result.affectedRows === 0) {
      res.status(404).send("User not found");
    } else {
      console.log("User updated successfully");
      res.send("User updated successfully");
    }
  });
};

// DELETE user by ID
const deleteUserById = (req, res) => {
  // Get the user ID from the request parameters
  const userId = req.params.id;

  // Define the SQL query
  const sql = "DELETE FROM users WHERE id = ?";

  // Execute the query with the user ID as a parameter
  dbPool.query(sql, userId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting user");
    } else if (result.affectedRows === 0) {
      res.status(404).send("User not found");
    } else {
      console.log("User deleted successfully");
      res.send("User deleted successfully");
    }
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
