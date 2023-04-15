const chalk = require("chalk");class Logger {
    write(message, separator) {
        console.log(`${message}${separator ? "\n\n" : ""}`);
    }

    info(message, separator) {
        console.log(chalk.cyan(`[INFO] ${message}${separator ? "\n\n" : ""}`));
    }

    success(message, separator) {
        console.log(chalk.bgGreen.bold(`[SUCCESS] ${message}${separator ? "\n\n" : ""}`))
    }

    error(message, separator) {
        console.log(chalk.bgRed.bold(`[ERROR] ${message}${separator ? "\n\n" : ""}`));
    }
}

module.exports = {
    Logger
}
