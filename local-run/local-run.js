const {runTool} = require("../src/toolImpl");

const configFieldsObj = {
    PARAM1: "YYYYYYYYYYYYYYYY",
    PARAM2: "XXXXXXXXXXXXXXXXX"
}

function getArgvInput() {
    return Object.keys(configFieldsObj).map(key => {
        return key + "=" + configFieldsObj[key];
    })
}

process.argv = getArgvInput();

(async () => {
    await runTool();
})();
