const MEDIA_BUCKET_PREFIX = "screen-recording-bucket";
const LOGS_BUCKET_PREFIX = "screen-agent-log-files-bucket";

const AWSJestMock = require("jest-aws-sdk-mock");
const s3Template = require("./templates/s3Template");

function createS3GetMock(shouldFailUploadToLogsBucket, shouldFailUploadToMediaBucket) {
    AWSJestMock.mock('S3', 'putObject', function (params, callback) {

        if (shouldFailUploadToLogsBucket && params.Bucket.includes(LOGS_BUCKET_PREFIX))
            throw new Error("Failed to upload to S3 logs bucket");

        if (shouldFailUploadToMediaBucket && params.Bucket.includes(MEDIA_BUCKET_PREFIX))
            throw new Error("Failed to upload to S3 media bucket");

        callback(null, s3Template.successfulUploadToS3Response);
    });
}

function restoreMock(){
    AWSJestMock.restore();
}

module.exports = {
    createS3GetMock: createS3GetMock,
    restoreMock: restoreMock
}