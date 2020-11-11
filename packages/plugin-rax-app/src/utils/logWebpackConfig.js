const debug = require('debug')('rax-app');

module.exports = (configs) => {
  try {
    const tmp = [];
    debug(JSON.stringify(configs, function(key, val) {
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
