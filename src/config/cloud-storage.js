const { Storage } = require("@google-cloud/storage");

// credentials-key
const storage = new Storage({
    projectId: process.env.CS_PROJECT_ID,
    keyFilename: "credentials/cloud-storage.json", 
});

const bucketName = process.env.CS_BUCKET_NAME;

const bucket = storage.bucket(bucketName); // my bucket name in the cloud

module.exports = {
    bucket,
    bucketName
};
