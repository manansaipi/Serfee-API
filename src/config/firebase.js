const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://serfee-project-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
firebase.initializeApp({
    apiKey: "AIzaSyAwxOLHJ4xiz6DV001VyDu2RQYCVHqmux8",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "serfee-project",
});

module.exports = {
    admin,
    firebase
};
