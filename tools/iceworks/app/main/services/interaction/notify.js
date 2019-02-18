// Packages
const { resolve } = require('app-root-path');
const { shell, Notification } = require('electron');

const log = require('../../logger');
const settings = require('../settings');

const iconMap = {
  error: resolve('./static/notify/error.png'),
  info: resolve('./static/notify/info.png'),
  warn: resolve('./static/notify/warn.png'),
  success: resolve('./static/notify/success.png'),
};

module.exports = ({ title, body, type = 'success', url, onClick }) => {
  const specs = {
    title,
    body,
    silent: !settings.get('tone'),
    icon: iconMap[type] || '',
  };
  const notification = new Notification(specs);

  if (url || onClick) {
    notification.on('click', () => {
      if (onClick) {
        return onClick();
      }

      shell.openExternal(url);
    });
  }

  notification.show();
  log.info(`[Notification] ${title}: ${body}`);
};
