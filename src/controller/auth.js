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
        const userCredential = await firebaseConfig.firebase.auth().signInWithEmailAndPassword(email, password);
        const name = userCredential.user.displayName;
        const userId = userCredential.user.uid;
        // Access the access token
        const token = await userCredential.user.getIdToken();
        res.json({
            message: "success login",
            loginResult: {
                userId,
                name,
                token
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to login",
            error
        });
    }
};
// CREATE a new user
const register = async (req, res) => {
    const { body } = req;
    const email = body.email;
    const password = body.password;
    const name = body.name;
    if (typeof email !== "string" || email.trim().length === 0) {
        console.log(email);
        throw new Error("Invalid email");
    }

    try {
        // Create user account in Firebase Authentication using firebase-admin
        const userRecord = await firebaseConfig.admin.auth().createUser({
            email,
            password,
            displayName: name
        });
        const firebase_uid = userRecord.uid; // take firebase_uid to store into mysql
        if (email) {
            // add new user data into mysql
            await UsersModel.createNewUserWhenRegister(firebase_uid, name, email);
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

// this one is still not working, mayber logout handle in mobile devices by deleting access token(probably)
const logout = async (req, res) => {
    const firebase_uid = req.user.uid;
    const tokensValidAfterTime = {
        // Set the tokensValidAfterTime to the current time
        tokensValidAfterTime: new Date().getTime() / 1000
    };
    console.log(firebase_uid);
    try {
        await firebaseConfig.admin.auth().updateUser(firebase_uid, tokensValidAfterTime);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            serverMessage: error
        });
    }
};

const deleteAccount = async (req, res) => {
    const firebase_uid = req.user.uid;

    try {
        await UsersModel.deleteUser(firebase_uid);
        await firebaseConfig.admin.auth().deleteUser(firebase_uid);
        res.json({ 
            message: "Account Deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete account",
            serverMessage: error
        });
    }
};

module.exports = {
    login,
    register,
    logout,
    deleteAccount
};