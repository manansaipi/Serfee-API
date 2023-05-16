const { Storage } = require("@google-cloud/storage");

// credentials-key
const storage = new Storage({
    projectId: "qwiklabs-gcp-01-1b40081c2894",
    keyFilename: "credentials/cloud-storage.json", 
});

const bucketName = "example_express";

const bucket = storage.bucket(bucketName); // my bucket name in the cloud

module.exports = {
    bucket,
    bucketName
};
