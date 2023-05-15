const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://qwiklabs-gcp-03-3b17e690c4f5-default-rtdb.firebaseio.com/"
});
firebase.initializeApp({
    apiKey: "AIzaSyCDIss3olwCKq422tBlJtnGkj1bbSsyNxg",
    authDomain: "https://oauth2.googleapis.com/token",
    projectId: "qwiklabs-gcp-03-3b17e690c4f5",
});

module.exports = {
    admin,
    firebase
};
