const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://rest-76eeb-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
firebase.initializeApp({
    apiKey: "AIzaSyAIwXmU0JRn_65DqwkRNpmCPge-7pJdsbY",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "rest-76eeb",
});

module.exports = {
    admin,
    firebase
};
