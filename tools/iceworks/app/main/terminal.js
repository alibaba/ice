const sendToWebContents = require('./helper/sendToWebContents');

module.exports = {
  send: (path, data) => {
    // eslint-disable-next-line no-undef
    sendToWebContents(windows.home, 'terminal-output', {
      path,
      data,
    });
  },
};
