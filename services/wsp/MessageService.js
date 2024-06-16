const Logger = require('../utils/LoggerService');
const { OtherUtilsSelenium, DOMSelenium } = require('../utils/SeleniumService');
const StorageService = require('../utils/StorageService');

// Crear una instancia del logger
const logger = new Logger();

class WhatsAppAutomation {
    constructor(driver) {
        this.driver = driver;
        this.seleniumElements = new DOMSelenium(driver);
        this.seleniumUtils = new OtherUtilsSelenium(driver);
        this.storageService = new StorageService(driver);
    }

    async openWhatsAppWeb() {
        try {
            await this.driver.get('https://web.whatsapp.com/');
            logger.info('Opened WhatsApp Web.');
        } catch (error) {
            logger.error('Failed to open WhatsApp Web: ' + error);
        }
    }

    async sendMessage(recipientNumber, message) {
        try {
            logger.info('Sending message...');
            // Search for the recipient
            await this.seleniumElements.sendKeys('//*[@id="side"]/div[1]/div/label/div/div[2]', recipientNumber, 'Recipient search input');
            await this.driver.sleep(2000); // Wait for search results to appear
            await this.seleniumElements.clickElement(`//span[@title='${recipientNumber}']`, 'Recipient in contact list');
            await this.driver.sleep(2000); // Wait for chat to open
            // Enter and send the message
            await this.seleniumElements.sendKeys('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]', message, 'Message input field');
            await this.seleniumElements.clickElement('//*[@id="main"]/footer/div[1]/div[3]/button', 'Send button');
            logger.info('Message sent successfully.');
        } catch (error) {
            logger.error('Error sending message: ' + error);
        } finally {
            const folderName = await this.storageService.getCurrentLogFolderName();
            await this.seleniumUtils.takeScreenshot(`./logs/${folderName}/whatsapp-message-end.png`);
        }
    }
}

module.exports = WhatsAppAutomation;