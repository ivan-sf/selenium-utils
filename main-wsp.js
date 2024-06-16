const Logger = require('./services/utils/LoggerService');
const TestAutomationWSP = require('./services/wsp/main/TestAutomationService');
const WhatsAppUserInput = require('./services/wsp/main/WSPService');

(async () => {
    const logger = new Logger();

    try {
        logger.info('Initializing test setup...');

        const userInput = new WhatsAppUserInput(logger);
        const userData = userInput.getUserData();

        const testAutomation = new TestAutomationWSP(userData, logger);
        await testAutomation.runTests();
        logger.info('All tests completed successfully.');
    } catch (error) {
        logger.error('Error executing tests:', error);
        process.exit(1);
    }
})();
