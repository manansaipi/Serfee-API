const { Storage } = require("@google-cloud/storage");

// credentials-key
const storage = new Storage({
    projectId: "qwiklabs-gcp-01-b041cd9c1b6b",
    keyFilename: "credentials/cloud-storage.json", 
});

const bucketName = "abdul_bucket3";

const bucket = storage.bucket(bucketName); // my bucket name in the cloud

module.exports = {
    bucket,
    bucketName
};
