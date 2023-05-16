const config = require("../config/firebase");

/*  This middleware is to take the user data from
    firebase by access token given in headers with
    key = 'authorization' and the value = accessToken 
    and store it in req.user so we can use the req.user in controller
*/
const authMiddleware = async (req, res, next) => {
    const idToken = req.headers.authorization; // get access token
    try {
        const decodeToken = await config.admin.auth().verifyIdToken(idToken);
        req.user = decodeToken; // asign req.user with decodeToken to access user's information
        // now req.user have user data got from firebase
        next();
    } catch (error) {
        res.status(401).json({
            error: "Unauthorized"
        });
    }
};

module.exports = {
    authMiddleware
};