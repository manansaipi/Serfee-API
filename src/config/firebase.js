const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://qwiklabs-gcp-01-1b40081c2894-default-rtdb.firebaseio.com/"
});
firebase.initializeApp({
    apiKey: "AIzaSyBkPul50EeT3M6MYO8O4S-_ghgGZvMmWac",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "qwiklabs-gcp-01-1b40081c2894",
});

module.exports = {
    admin,
    firebase
};
