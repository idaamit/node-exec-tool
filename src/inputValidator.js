const PARAM1 = "PARAM1";
const {Logger} = require("./logger"), logger = new Logger();



function parseConfigFields(argvInput) {
    const configFields = {
        PARAM1: "",
        PARAM2: ""
    };

    argvInput.forEach((field) => {
        const key = field.split("=")[0];

        if (Object.keys(configFields).find(field => field === key))
            configFields[key] = field.split(`${key}=`)[1];
    });
    return configFields;
}

function validateConfigFields(argvInput) {
    const configFields = parseConfigFields(argvInput);

    const invalidFields = [];

    if (!validate(configFields.PARAM1))
        invalidFields.push(PARAM1);

    if (invalidFields.length > 0) {
        logger.error(`Invalid values for config fields: ${invalidFields.join(", ")}`);
        return null;
    } else {
        logger.success("All config fields are valid", true);
        return configFields;
    }
}

function validate(property) {
    const regex = /^[A-Za-z0-9=]*$/;
    return !!property && regex.test(property);
}

module.exports = {
    validateConfigFields,
}
