// Import dependencies
const UsersModel = require("../models/users");

// CREATE a new user
const createUser = async (req, res) => {
    // console.log(req.body)
    const { body } = req;

    if (!body.full_name || !body.email) {
        return res.status(400).json({
            message: "Invalid input value",
            data: null
        });
    }

    try {
        await UsersModel.createNewUser(body); // excecute query
        return res.status(201).json({
            message: "CREATE new user success", 
            data: body
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            erverMessage: error,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers(); // excecute query
        res.json({
            message: "GET all users",
            data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};
// READ a user by ID
const getUserById = async (req, res) => {
    // Get the user ID from the request parameters
    const id = req.params.id;
    console.log("id: ", id);
    try {
        const [data] = await UsersModel.getUser(id); // excecute query
        res.json({
            message: "Get user success",
            data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const updateUserById = async (req, res) => {
    const { id } = req.params.id;
    const { body } = req;
    console.log("id: ", id);
    try {
        await UsersModel.updateUser(body, id); // excecute query
        res.json({
            message: "UPDATE user success",
            data: {
                id,
                ...body
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("id: ", id);
    try {
        const [data] = await UsersModel.getUser(id); // excecute query
        console.log(data);
        if (data === "") {
            res.status(404).json({
                message: "id not found"
            });
        } else {
            await UsersModel.deleteUser(id); // excecute query
            res.json({
                message: "DELETE user success",
                data: {
                    id,
                    body
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
