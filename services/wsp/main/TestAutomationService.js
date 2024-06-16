const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { OtherUtilsSelenium } = require('../../utils/SeleniumService');
const StorageService = require('../../utils/StorageService');
const WhatsAppAutomation = require('../MessageService');

class TestAutomationWSP {
    constructor(userData, logger) {
        this.username = userData.username;
        this.email = userData.email;
        this.password = userData.password;
        this.selectedUrl = userData.selectedUrl;
        this.selectedSubsystem = userData.selectedSubsystem;
        this.logger = logger;
        this.driver = null;
    }

    async createWebDriver() {
        const options = new chrome.Options();
        options.addArguments('--start-maximized');

        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        this.seleniumUtils = new OtherUtilsSelenium(this.driver);
        this.storageService = new StorageService(this.driver);
        this.wspService = new WhatsAppAutomation(this.driver);
    }

    async runTests() {
        this.logger.info('User: ' + this.username);

        await this.createWebDriver();

        try {
            await this.wspService.openWhatsAppWeb()
        } catch (error) {
            this.logger.error('Error in the test: ' + error);
        } finally {
            setTimeout(async () => {
                const folderName = await this.storageService.getCurrentLogFolderName();
                await this.seleniumUtils.takeScreenshot(`./logs/${folderName}/end-test.png`)
                await this.driver.quit();
            }, 3000);
        }
    }
}

module.exports = TestAutomationWSP;
