const sendToWebContents = require('./helper/sendToWebContents');

module.exports = {
  send: (path, data) => {
    // log.debug.apply(log, args);
    // eslint-disable-next-line no-undef
    sendToWebContents(windows.home, 'terminal-output', {
      path,
      data,
    });
  },
};
