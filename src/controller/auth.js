const firebaseConfig = require("../config/firebase"); // Import firebase configuration
const UsersModel = require("../models/users");

const login = async (req, res) => {
    const { body } = req;
    const email = body.email;
    const password = body.password;

    if (typeof email !== "string" || email.trim().length === 0) {
        console.log(email);
        throw new Error("Invalid email");
    }

    try {
        // firebase auth using firebase core modules
        const userRecord = await firebaseConfig.firebase.auth().signInWithEmailAndPassword(email, password);
        res.json({
            message: "success login",
            userRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to login");
    }
};
const register = async (req, res) => {
    const { body } = req;
    const email = body.email;
    const password = body.password;
    const fName = email.split("@")[0];
    if (typeof email !== "string" || email.trim().length === 0) {
        console.log(email);
        throw new Error("Invalid email");
    }

    try {
        // Create user account in Firebase Authentication using firebase-admin
        const userRecord = await firebaseConfig.admin.auth().createUser({
            email,
            password,
        });
        const firebase_uid = userRecord.uid; // take firebase_uid to store into mysql
        if (email) {
            await UsersModel.createNewUserWhenRegister(firebase_uid, fName, email);
            res.json({ 
                message: "success regist",
                user: userRecord.toJSON()
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create user",
            serverMessage: error
        });
    }
};

module.exports = {
    login,
    register
};