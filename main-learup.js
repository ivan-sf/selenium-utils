const UserInput = require('./services/learup/main/UserInput');
const TestAutomation = require('./services/learup/main/TestAutomationService');
const Logger = require('./services/utils/LoggerService');

(async () => {
    const logger = new Logger();

    try {
        logger.info('Initializing test setup...');

        const userInput = new UserInput(logger);
        const userData = userInput.getUserData();

        const testAutomation = new TestAutomation(userData, logger);
        await testAutomation.runTests();
        logger.info('All tests completed successfully.');
    } catch (error) {
        logger.error('Error executing tests:', error);
        process.exit(1);
    }
})();
