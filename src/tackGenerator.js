const {v4: uuidv4} = require('uuid');

let runUniqueId;
function getRunUniqueId(){
    return runUniqueId;
}

function generateRunUniqueId(){
    runUniqueId = uuidv4();
    return runUniqueId;
}

module.exports = {
    generateRunUniqueId,
    getRunUniqueId
}