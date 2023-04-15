const {exec} = require('pkg');
const fs = require("fs");

const appVersion = process.env.npm_package_version || '1.1.1';
const exeFileName = `MyExec-${appVersion}`;
const exeFileName64bit = exeFileName + "-win-x64";
const exeFileName32bit = exeFileName + "-win-x86";

const options = [
    `${process.cwd()}/../src/main.js`,
    "--output", `${process.cwd()}/../build/${exeFileName}`,
    "--targets", "node14-macos-x64,node14-win-x64,node14-win-x86",
];

// required for pipeline template
const jsonForPipeline =
    {
        "list":
            [
                {
                    "name": `${exeFileName64bit}`,
                    "vendor": "My Company",
                    "version": appVersion,
                    "url": `/myExecTool/${exeFileName64bit}.exe`,
                    "fileExtension": ".exe"
                },
                {
                    "name": `${exeFileName32bit}`,
                    "vendor": "My Company",
                    "version": appVersion,
                    "url": `/myExecTool/${exeFileName32bit}.exe`,
                    "fileExtension": ".exe"
                },
            ]
    }

function createJsonFile() {
    fs.writeFileSync(`${process.cwd()}/../build/installersListWin.json`, JSON.stringify(jsonForPipeline), function (err) {
        if (err) {
            console.log("Failed to create installersListWin JSON file");
        } else {
            console.log("Successfully created installersListWin JSON file");
        }
    })
}

(async () => {
    createJsonFile();
    await exec(options);
})();
