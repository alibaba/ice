const debug = require('debug')('ice:start:general');
const getType = require('../utils/type');
const logger = require('../utils/logger');
const message = require('../utils/message');

module.exports = function start(cwd, opt) {
  const type = getType(cwd);
  debug('type %s', type);
  if (!type) {
    logger.fatal(message.invalid);
  }

  process.env.NODE_ENV = 'development';
  
  require(`./${type}/start`)(cwd, opt);
};
