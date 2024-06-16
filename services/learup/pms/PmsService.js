const { By, until } = require('selenium-webdriver');
const { Logger } = require('selenium-webdriver/lib/logging');
const { DOMSelenium, OtherUtilsSelenium } = require('../../utils/SeleniumService');
const StorageService = require('../../utils/StorageService');

// Crear una instancia del logger
const logger = new Logger();

class PMS {
    constructor(driver) {
        this.driver = driver;
        this.seleniumElements = new DOMSelenium(driver);
        this.storageService = new StorageService(driver);
        this.seleniumUtils = new OtherUtilsSelenium(driver);
    }

    async navigateMasters() {
        try {
            logger.info('Clicking on the masters button...');
            await this.seleniumElements.clickElement('//*[@id="__next"]/div[2]/div[1]/div/div[1]/div/div[2]/ul[1]/div[4]/a');
            logger.info('Load masters successfully.');
        } catch (error) {
            logger.error('Error clicking on masters: ' + error);
        } finally {
            const folderName = await this.storageService.getCurrentLogFolderName();
            await this.seleniumUtils.takeScreenshot(`./logs/${folderName}/masters.png`)
        }
    }
}

module.exports = PMS;
