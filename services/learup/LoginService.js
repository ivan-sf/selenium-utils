const Logger = require('../utils/LoggerService');
const { OtherUtilsSelenium, DOMSelenium } = require('../utils/SeleniumService');
const StorageService = require('../utils/StorageService');

// Crear una instancia del logger
const logger = new Logger();

class Login {
    constructor(driver) {
        this.driver = driver;
        this.seleniumElements = new DOMSelenium(driver);
        this.seleniumUtils = new OtherUtilsSelenium(driver);
        this.storageService = new StorageService(driver);
    }

    async openPage(url) {
        try {
            await this.driver.get(url);
            logger.info('Login process initiated.');
        } catch (error) {
            logger.error('Failed to open the page: ' + error);
        }
    }

   async enterCredentials(email, password) {
        try {
            logger.info('Entering credentials...');
            await this.seleniumElements.sendKeys('//*[@id="email__signin"]', email, 'Email input field');
            await this.seleniumElements.sendKeys('//*[@id="password__signin"]', password, 'Password input field');
        } catch (error) {
            logger.error('Error entering credentials: ' + error);
        }
    }

    async clickSignInButton() {
        try {
            logger.info('Clicking on the sign-in button...');
            await this.seleniumElements.clickElement('//*[@id="btn__signin"]');
            logger.info('Login process completed successfully.');
        } catch (error) {
            logger.error('Error clicking on the sign-in button: ' + error);
        } finally {
            const folderName = await this.storageService.getCurrentLogFolderName();
            await this.seleniumUtils.takeScreenshot(`./logs/${folderName}/login-page-end.png`)
        }
    }

    async clickPMSAccess() {
        try {
            logger.info('Initiating PMS access.');
            await this.seleniumElements.clickElement('//*[@id="__next"]/div[2]/div/div/div[2]/div/div/div[2]/ul/li[1]/div/div/div', 'PMS access');
            logger.info('PMS access completed successfully.');
        } catch (error) {
            logger.error('Error initiating PMS access: ' + error);
        } finally {
            const folderName = await this.storageService.getCurrentLogFolderName();
            await this.seleniumUtils.takeScreenshot(`./logs/${folderName}/click-acces-pms.png`)
        }
    }
    
    async clickQMSAccess() {
        try {
            logger.info('Initiating QMS access.');
            await this.seleniumElements.clickElement('//*[@id="__next"]/div[2]/div/div/div[2]/div/div/div[2]/ul/li[2]/div/div/div', 'QMS access');
            logger.info('QMS access completed successfully.');
        } catch (error) {
            logger.error('Error initiating QMS access: ' + error);
        } finally {
            const folderName = await this.storageService.getCurrentLogFolderName();
            await this.seleniumUtils.takeScreenshot(`./logs/${folderName}/click-acces-qms.png`)
        }
    }
}

module.exports = Login;
