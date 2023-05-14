const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebase.json"); // credentials-key

admin.initializeApp({ // init
    credential: admin.credential.cert(serviceAccount), // credentials
    databaseURL: "https://qwiklabs-gcp-01-11295665b6ce-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
firebase.initializeApp({
    apiKey: "AIzaSyCQ1BER9gwfnFCv5KZpDP7mRfzpgt35fII",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "qwiklabs-gcp-01-11295665b6ce",
});

module.exports = {
    admin,
    firebase
};
