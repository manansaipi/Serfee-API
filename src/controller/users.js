// Import dependencies
const fs = require("fs");

const UsersModel = require("../models/users");
const firebaseConfig = require("../config/firebase");
const cloudStorageConfig = require("../config/cloud-storage");

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
    const firebase_uid = req.user.uid;
    try {
        const [data] = await UsersModel.getUser(firebase_uid); // excecute query
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

// This function will upload user photo to Cloud Storage
const uploadUserPhoto = async (firebase_uid, file, email) => {
    const destination = `images/profile/${email}/${file.filename}`; // path to save in the bucket and the file name
    const fileObject = cloudStorageConfig.bucket.file(destination);
    const filePath = `./public/images/${file.filename}`; // path to acces images

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
            const writeStream = fileObject.createWriteStream(options);

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
        //  if success Get the public URL
        const publicUrl = `https://storage.googleapis.com/${cloudStorageConfig.bucketName}/${destination}`; 
        const photoUrl = {
            photoUrl: publicUrl
        };
        // if success update user photoURL in firebase by firebase_uid
        await firebaseConfig.admin.auth().updateUser(firebase_uid, photoUrl);
        return publicUrl;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const updateUserById = async (req, res) => {
    // Get firebase_uid asign from authMiddleware using authorization access token 
    const firebase_uid = req.user.uid; 
    const { body } = req; // get data from body in JSON
    const email = body.email; // this email to asign into uplaodUserPhoto to store in cloudStorage path
    let photo_url;
    try {
        if (req.file != null) { // if the request contain a file then upload image to cloud storage
            const file = req.file; // get file in body->form-data
            photo_url = await uploadUserPhoto(firebase_uid, file, email); // take the umage_url
        }
        // excecute query to update full_name in mysql
        await UsersModel.updateUser(firebase_uid, body, photo_url);
        // update user data data in firebase
        await firebaseConfig.admin.auth().updateUser(firebase_uid, body);
        res.json({
            message: "UPDATE user success",
            data: {
                firebase_uid,
                photo_url,
                ...body
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    uploadUserPhoto
};
