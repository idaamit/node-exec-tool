const {Logger} = require("./logger"), logger = new Logger();
const inputValidator = require("./inputValidator");
const tackGenerator = require("./tackGenerator");
const commonHelper = require("./commonHelper");

async function runTool() {

    if (!commonHelper.checkIfRunningAsAdministrator()) {
        logger.error("Please run the tool as Administrator");
        return;
    }

    logger.write('Preparing to run tool...', true);

    logger.info("Validating config input...");
    logger.info("Checking if config fields are valid");


    const configFields = inputValidator.validateConfigFields(process.argv);
    if (!configFields)
        return;


    const runUniqueId = tackGenerator.generateRunUniqueId();
    logger.write(`Tool run unique ID: ${runUniqueId}`, true);

}

module.exports = {
    runTool: runTool
}
