'use strict';

const {runTool} = require("../src/toolImpl");
const testRecorder = require("../src/testRecorder");
const childProcessMock = require("./mocks/childProcessMock");
const processMock = require("./mocks/processMock");
const s3Mock = require("./mocks/s3Mock");
const nock = require("nock");
const fs = require("fs");

const runUniqueId = "00000000-0000-0000-0000-000000000000";
jest.mock('uuid', () => ({v4: () => runUniqueId}));

const configFieldsObj = {
    ACCESS_KEY_ID: "L2YRCCQCRSE47PRBSSYY7E245YDIVMN22UDGQFJ54IRUH3XR3AXQ====",
    ACCESS_KEY_SECRET: "XMRUW7WJGXWIN2JVVKGCBXGFLKYEYXQHMPKOGXI3P4HDVWUBZMYA====",
    REGION_TYPE: "na1.test",
    WEB_PROXY: ""
}

function mockCreateLogFile() {
    jest.spyOn(fs, "appendFile").mockImplementation(() => {
        console.log("Log file created (mock)");
    })
}

function  expectAllToolTestsToNotRun() {
    Object.keys(testRecorder.tests).forEach(key => expect(testRecorder.tests[key].resultStatus).toEqual(testRecorder.testStatus.NOT_RUN));
}

function expectAllToolTestsToPass() {
    Object.keys(testRecorder.tests).forEach(key => expect(testRecorder.tests[key].resultStatus).toEqual(testRecorder.testStatus.PASSED));
}

function getArgvInput(invalidFields) {
    const invalidChar = "?";

    return Object.keys(configFieldsObj).map(key => {
        if (invalidFields && invalidFields.includes(key))
            return key + "=" + configFieldsObj[key] + invalidChar;
        else
            return key + "=" + configFieldsObj[key];
    })
}

function resetTestRecorder() {
    Object.keys(testRecorder.tests).forEach(key => {
        testRecorder.tests[key].resultStatus = testRecorder.testStatus.NOT_RUN
    });
}

describe('My tool full flow', () => {
    beforeAll(() => {
    });

    beforeEach(() => {
        resetTestRecorder();
        s3Mock.restoreMock();
        jest.clearAllMocks();
        jest.restoreAllMocks();
        nock.cleanAll();
        mockCreateLogFile();
        childProcessMock.mockRunAsAdministrator(true);
    });

    test("tool should not run if NOT running as administrator", async function () {
        childProcessMock.mockRunAsAdministrator(false);
        const configFields = getArgvInput();
        await runTool(configFields);

        expectAllToolTestsToNotRun();
    })

    test("Tool should NOT run if received invalid config fields", async function () {
        const invalidConfigFields = getArgvInput(["ACCESS_KEY_ID", "ACCESS_KEY_SECRET", "REGION_TYPE"]);

        processMock.mockArgvInput(invalidConfigFields);

        await runTool(invalidConfigFields);

        expectAllToolTestsToNotRun();
    })

});
