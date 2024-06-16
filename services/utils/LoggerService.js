const StorageService = require('./StorageService');

require('colors');

class Logger {
    constructor() {
        this.logFileStream = new StorageService().createLogFile();
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [LOG] ${message}\n`;
        console.log(logMessage.blue);
        this.logFileStream.write(logMessage);
    }

    error(message) {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] [ERROR] ${message}\n`;
        console.error(errorMessage.red);
        this.logFileStream.write(errorMessage);
    }

    info(message) {
        const timestamp = new Date().toISOString();
        const infoMessage = `[${timestamp}] [INFO] ${message}\n`;
        console.info(infoMessage.green);
        this.logFileStream.write(infoMessage);
    }

    success(message) {
        const timestamp = new Date().toISOString();
        const successMessage = `[${timestamp}] [SUCCESS] ${message}\n`;
        console.log(successMessage.green);
        this.logFileStream.write(successMessage);
    }
}

module.exports = Logger;
