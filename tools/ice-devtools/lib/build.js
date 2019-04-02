/* Deprecated */
/* eslint-disable */
const debug = require('debug')('ice:build:general');
const getType = require('../utils/type');
const logger = require('../utils/logger');
const message = require('../utils/message');

module.exports = function build(cwd, opt) {
  const type = getType(cwd);
  debug('type %s', type);
  if (!type) {
    logger.fatal(message.invalid);
  }

  process.env.NODE_ENV = 'production';

  require(`./${type}/build`)(cwd, opt);
};
