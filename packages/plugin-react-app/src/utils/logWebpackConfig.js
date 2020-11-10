const debug = require('debug')('icejs');

module.exports = (config) => {
  try {
    const tmp = [];
    debug(JSON.stringify(config, function(key, val) {
      if (val != null && typeof val === 'object') {
        if (tmp.indexOf(val) >= 0) {
          return;
        }
        tmp.push(val);
      }
      return val;
    }, 2));
  } catch (error) {
    // ignore error
  }
};
