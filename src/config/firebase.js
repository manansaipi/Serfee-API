const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://qwiklabs-gcp-01-ce5bd7905e65-default-rtdb.firebaseio.com/"
});
firebase.initializeApp({
    apiKey: "AIzaSyB0654smxFxMgHWZIoY4T9EDe5SEsJdROw",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "qwiklabs-gcp-01-ce5bd7905e65",
});

module.exports = {
    admin,
    firebase
};
