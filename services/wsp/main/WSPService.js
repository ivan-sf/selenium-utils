const readlineSync = require('readline-sync');
const Logger = require('../../utils/LoggerService');

class WhatsAppUserInput {
    constructor() {
        this.senderNumber = '';
        this.recipientNumber = '';
        this.message = '';
        this.logger = new Logger();
    }

    getPhoneNumber(prompt) {
        const phoneNumber = readlineSync.question(prompt);
        if (!phoneNumber.match(/^\d+$/)) {
            this.logger.error('Invalid phone number. Only digits are allowed.');
            process.exit(1);
        }
        return phoneNumber;
    }

    getMessage() {
        this.logger.info('Getting message content.');
        this.message = readlineSync.question('Enter the message to send: ');
        if (!this.message) {
            this.logger.error('Error: Message cannot be empty.');
            process.exit(1);
        }
    }

    getUserData() {
        this.logger.info('Getting WhatsApp user data.');
        this.senderNumber = this.getPhoneNumber('Enter your WhatsApp number (sender): ');
        this.recipientNumber = this.getPhoneNumber('Enter the recipient WhatsApp number: ');
        this.getMessage();
        return {
            senderNumber: this.senderNumber,
            recipientNumber: this.recipientNumber,
            message: this.message
        };
    }
}

module.exports = WhatsAppUserInput;
