// Import dependencies
const fs = require("fs");

const UsersModel = require("../models/users");
const firebaseConfig = require("../config/firebase");
const cloudStorageConfig = require("../config/cloud-storage");
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
    // Get firebase_uid asign from authMiddleware using authorization access token 
    const firebase_uid = req.user.uid; 
    const { body } = req; // get data from body in JSON
    try {
        // excecute query to update full_name in mysql
        await UsersModel.updateUser(firebase_uid, body.displayName);

        // update user data data in firebase
        await firebaseConfig.admin.auth().updateUser(firebase_uid, body);
        res.json({
            message: "UPDATE user success",
            data: {
                firebase_uid,
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

// This function will upload user photo to Cloud Storage
const uploadUserPhoto = async (req, res) => {
    const firebase_uid = req.user.uid; // get firebase_uid from authMiddleware using authorization access token 
    const file = req.file; // get file in body->form-data
    const destination = cloudStorageConfig.bucket.file(`images/profile/${file.filename}`); // path to save in the bucket and the file name
    const filePath = `./public/images/${file.filename}`; // path to acces images

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${cloudStorageConfig.bucketName}/images/profile/${file.filename}`; 
    // need to store this URL to the firebase to access user photo
    
    try {
        const options = {
            metadata: {
                contentType: file.mimetype,
            },
            predefinedAcl: "publicRead", // set public access control in Cloud SQL
        };
        // store photo to Cloud SQL
        await new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(`./public/images/${file.filename}`);
            const writeStream = destination.createWriteStream(options);

            readStream.on("error", reject);
            writeStream.on("error", reject);
            writeStream.on("finish", resolve);

            readStream.pipe(writeStream);
        });
        // do delete file  in public/images directory after upload to Cloud SQL
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${err}`);
            }
        });
        // get photo url in hte Cloud SQL to store in firebase
        const photoUrl = {
            photoUrl: publicUrl
        };
        // update user photoURL in firebase by firebase_uid
        await firebaseConfig.admin.auth().updateUser(firebase_uid, photoUrl);
        res.json({
            message: "Upload success",
            firebase_uid,
            data: req.file,
            url: publicUrl
        });
        // update user data data in firebase
        
    } catch (error) {
        res.json({
            message: error
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    uploadUserPhoto
};
