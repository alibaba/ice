const debug = require('debug');

const logger = debug('ice-scripts');

logger.info = logger.bind(logger, 'INFO');
logger.warn = logger.bind(logger, 'WARN');
logger.debug = logger.bind(logger, 'DEBUG');
logger.error = logger.bind(logger, 'ERROR');

module.exports = logger;
