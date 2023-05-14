const config = require("../config/firebase"); // Import firebase configuration
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
        const userRecord = await config.firebase.auth().signInWithEmailAndPassword(email, password);
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

    if (typeof email !== "string" || email.trim().length === 0) {
        console.log(email);
        throw new Error("Invalid email");
    }

    try {
        // Create user account in Firebase Authentication using firebase-admin
        const userRecord = await config.admin.auth().createUser({
            email,
            password,
        });
        if(email){
            const email = userRecord.email;
            console.log(email)
            const fName = email.split("@")[0];
            await UsersModel.createNewUserWhenRegister(fName, email),
            res.json({ 
                message: "success regist",
                // user: userRecord.toJSON()
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