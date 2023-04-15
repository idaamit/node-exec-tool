const childProcess = require("child_process");

function checkIfRunningAsAdministrator() {
    try {
        childProcess.execFileSync("net", ["session"], {"stdio": "ignore"});
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    checkIfRunningAsAdministrator
}