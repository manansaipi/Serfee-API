const { Storage } = require("@google-cloud/storage");

// credentials-key
const storage = new Storage({
    projectId: "qwiklabs-gcp-00-83b70a9abe9b",
    keyFilename: "credentials/cloud-storage.json", 
});

const bucketName = "example_express1";

const bucket = storage.bucket(bucketName); // my bucket name in the cloud

module.exports = {
    bucket,
    bucketName
};
