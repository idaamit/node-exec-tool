const connectMessage = {
    command: "CONNECTED"
}

const stsCredentialsForMediaBucketMessage = {
    data: {
        payload: {
            msgType: "STS_CREDENTIALS",
            s3Bucket: "screen-recording-bucket",
            stsCredentials: {
                awsAccessKey: "x",
                awsSecretKey: "y"
            }
        }
    }
}

const stsCredentialsForLogsBucketMessage = {
    data: {
        payload: {
            msgType: "STS_CREDENTIALS",
            s3Bucket: "screen-agent-log-files-bucket",
            stsCredentials: {
                awsAccessKey: "x",
                awsSecretKey: "y"
            }
        }
    }
}


module.exports = {
    connectMessage: connectMessage,
    stsCredentialsForMediaBucketMessage: stsCredentialsForMediaBucketMessage,
    stsCredentialsForLogsBucketMessage: stsCredentialsForLogsBucketMessage,
}