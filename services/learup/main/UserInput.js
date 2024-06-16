const readlineSync = require('readline-sync');
const Logger = require('../../utils/LoggerService');

class UserInput {
    constructor() {
        this.username = '';
        this.email = '';
        this.password = '';
        this.selectedUrl = '';
        this.logger = new Logger();
    }

    getUserCredentials() {
        this.logger.info('Getting user credentials.');
        this.username = readlineSync.question('Enter your username for the test: ');
        this.email = readlineSync.question('Enter your email for the test: ');
        this.password = readlineSync.question('Enter your password for the test: ', { hideEchoBack: true });

        if (!this.username || !this.email || !this.password) {
            this.logger.error('Error: All fields are mandatory.');
            process.exit(1);
        }
    }

    selectSubsystem() {
        this.logger.info('Selecting subsystem.');
        const subsystems = ['PMS', 'QMS'];
        const index = readlineSync.keyInSelect(subsystems, 'Select the subsystem:');
        if (index === -1) {
            this.logger.error('Subsystem not selected. Exiting the program.');
            process.exit(1);
        }

        this.selectedSubsystem = subsystems[index];
    }

    selectEnvironment() {
        this.logger.info('Selecting environment URL.');
        const environments = [
            'http://localhost:3000/',
            'https://dev.learup.com/',
            'https://qa.learup.com/',
            'https://app.learup.com/'
        ];
        const index = readlineSync.keyInSelect(environments, 'Select the URL corresponding to the environment:');
        if (index === -1) {
            this.logger.error('Environment not selected. Exiting the program.');
            process.exit(1);
        }

        this.selectedUrl = environments[index];
    }

    getUserData() {
        this.getUserCredentials();
        this.selectSubsystem();
        this.selectEnvironment();
        return {
            username: this.username,
            email: this.email,
            password: this.password,
            selectedSubsystem: this.selectedSubsystem,
            selectedUrl: this.selectedUrl
        };
    }
}

module.exports = UserInput;
