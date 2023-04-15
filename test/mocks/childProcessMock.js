const SCREEN_AGENT_PROCESS_NAME = "ScreenAgent.exe";
const SCREEN_AGENT_WATCHDOG_PROCESS_NAME = "ScreenAgentWatchDog.exe";

const childProcess = require("child_process");
const childProcessMockTemplate = require("./templates/childProcessTemplate");

function mockRunAsAdministrator(isAdministrator) {
    jest.spyOn(childProcess, "execFileSync").mockImplementation((command) => {
        if (command === "net" && !isAdministrator)
            throw new Error("");
    })
}

function mockExec(getProcessDetailsShouldFailOnTries, launchScreenAgentShouldFail) {
    let tryNumber = 0;

    jest.spyOn(childProcess, "exec").mockImplementation((command,options, callback) => {
        if (command.includes("wmic")) {
            if (getProcessDetailsShouldFailOnTries && getProcessDetailsShouldFailOnTries.find(tryIndex => tryIndex === tryNumber)) {
                callback(null, "", "err");
            } else {
                if (command.includes(SCREEN_AGENT_WATCHDOG_PROCESS_NAME))
                    callback(null, childProcessMockTemplate.screenAgentWatchDogProcessDetailsStdout, "");
                if (command.includes(SCREEN_AGENT_PROCESS_NAME))
                    callback(null, childProcessMockTemplate.screenAgentProcessDetailsStdout, "");
            }

            tryNumber++;
        } else {
            if (launchScreenAgentShouldFail) {
                if (callback)
                    callback(null, "", "err");
            }
        }
    });
}

module.exports = {
    mockExec,
    mockRunAsAdministrator
}