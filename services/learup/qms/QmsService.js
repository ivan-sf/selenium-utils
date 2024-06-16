const { By, until } = require('selenium-webdriver');
const Logger = require('../../utils/LoggerService');

// Crear una instancia del logger
const logger = new Logger();

class QMS {
    constructor(driver) {
        this.driver = driver;
    }
}

module.exports = QMS;
