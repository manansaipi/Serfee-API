const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://qwiklabs-gcp-00-3c438bbc0fe5-default-rtdb.firebaseio.com/"
});
firebase.initializeApp({
    apiKey: "AIzaSyA4hVS1r8UqerWp-Q2Jqy3O-Iooq3IQ59s",
    authDomain: "https://oauth2.googleapis.com/token",
    projectId: "qwiklabs-gcp-00-3c438bbc0fe5",
});

module.exports = {
    admin,
    firebase
};
