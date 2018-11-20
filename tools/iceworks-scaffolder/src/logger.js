const debug = require('debug');
const chalk = require('chalk');

const logger = debug('icewokrs');

logger.info = logger.bind(logger, chalk.green('INFO'));
logger.error = logger.bind(logger, chalk.red('ERROR'));
logger.warn = logger.bind(logger, chalk.yellow('WARN'));

module.exports = logger;
