const log = require('./logger');
const sendToWebContents = require('./helper/sendToWebContents');

module.exports = {
  send: (path, data) => {
    // log.debug.apply(log, args);
    sendToWebContents(windows.home, 'terminal-output', {
      path,
      data,
    });
  },
};
