const logger = require('../util/logger');

const supportType = {
  block: true,
  scaffold: true,
}
module.exports = function add(cwd, type, opt) {
  if (!supportType[type]) {
    logger.fatal('type: %s is not support', type);
    return;
  }
}
