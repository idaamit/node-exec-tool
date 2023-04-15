const Table = require('easy-table');

const testStatus = {
    NOT_RUN: "N/A",
    PASSED: "Passed",
    FAILED: "Failed"
}

const tests = {
    closeScreenAgent: {
        shortDescription: "Close ScreenAgent",
        longDescription: "Closing ScreenAgent (ScreenAgentWatchDog.exe and ScreenAgent.exe) if open. (Required to run the tool.)",
        resultStatus: testStatus.NOT_RUN,
    },
    checkPort: {
        shortDescription: "Check port 31322",
        longDescription: "Checking if we can listen to port 31322...",
        resultStatus: testStatus.NOT_RUN,
    },
    getToken: {
        shortDescription: "Get token",
        longDescription: "Get token with accessKeyId and accessKeySecret",
        resultStatus: testStatus.NOT_RUN,
    },
    getRefreshToken: {
        shortDescription: "Get refresh token",
        longDescription: "Get refresh token",
        resultStatus: testStatus.NOT_RUN,
    },
    connectToNotificationService: {
        shortDescription: "Connect to notification service",
        longDescription: "Test connection to notification service web socket",
        resultStatus: testStatus.NOT_RUN,
    },
    receiveSTSCredentialsForLogsBucketFromNS: {
        shortDescription: "Receive STS credentials for logs bucket from notification service",
        longDescription: "Receive STS credentials for logs bucket from notification service",
        resultStatus: testStatus.NOT_RUN,
    },
    receiveSTSCredentialsForMediaBucketFromNS: {
        shortDescription: "Receive STS credentials for media bucket from notification service",
        longDescription: "Receive STS credentials for media bucket from notification service",
        resultStatus: testStatus.NOT_RUN,
    },
    launchScreenAgent: {
        shortDescription: "Launch ScreenAgent",
        longDescription: "Launching ScreenAgent (ScreenAgentWatchDog.exe and ScreenAgent.exe)",
        resultStatus: testStatus.NOT_RUN,
    },
    stopPortListener: {
        shortDescription: "Stop server on port 31322",
        longDescription: "Stop server on port 31322...",
        resultStatus: testStatus.NOT_RUN,
    },
    uploadLogToS3LogsBucket: {
        shortDescription: "Upload log of the tool run to S3 logs bucket",
        longDescription: "Upload log of the tool run to S3 logs bucket",
        resultStatus: testStatus.NOT_RUN,
    },
    uploadFileToS3MediaBucket: {
        shortDescription: "Upload file to S3 media bucket",
        longDescription: "Upload file to S3 media bucket",
        resultStatus: testStatus.NOT_RUN,
    },

}

function printTestInfo(testName) {
    const {Logger} = require("./logger"), logger = new Logger();
    const test = tests[testName];
    logger.info(`Performing test: ${test.shortDescription}`);
    logger.info(test.longDescription);
}

function updateTest(testName, isPassed) {
    tests[testName].resultStatus = isPassed ? testStatus.PASSED : testStatus.FAILED;
}

function getTestSummary() {
    const table = new Table();

    let testSummaryOutput = `========================================\n\nTEST SUMMARY\n\n`;
    for (const test in tests) {
        table.cell("Test Name", tests[test].shortDescription);
        table.cell("Result", tests[test].resultStatus.toUpperCase());
        table.newRow();
    }
    return `${testSummaryOutput}${table}\n`;
}

module.exports = {
    tests,
    testStatus,
    printTestInfo,
    updateTest,
    getTestSummary,
}
