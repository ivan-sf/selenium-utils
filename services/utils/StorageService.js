const fs = require('fs');
const path = require('path');

let staticTimestamp = null;
let newLogFolder = null;

class StorageService {
    constructor() {
        const logDir = path.join(__dirname, '../../logs');

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        if (!staticTimestamp) {
            newLogFolder = this.createLogFolder(logDir);
            staticTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
        }
    }

    createLogFolder(logDir) {
        const logFolders = fs.readdirSync(logDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const logCount = logFolders.length + 1;
        const newLogFolder = path.join(logDir, `test-${logCount}`);

        if (!fs.existsSync(newLogFolder)) {
            fs.mkdirSync(newLogFolder);
        }

        return newLogFolder;
    }

    createLogFile() {
        const logFilePath = path.join(newLogFolder, `logs-${staticTimestamp}.log`);
        return fs.createWriteStream(logFilePath, { flags: 'a' });
    }

    getCurrentLogFolderName() {
        return path.basename(newLogFolder);
    }
}

module.exports = StorageService;
