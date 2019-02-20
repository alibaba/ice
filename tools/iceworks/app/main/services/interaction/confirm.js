const { dialog } = require('electron');

module.exports = ({ title, message, buttons, type }, ok, cancel) => {
  // eslint-disable-next-line
  const win = windows && windows.home;
  dialog.showMessageBox(
    win || undefined,
    {
      type: type || 'info',
      buttons: buttons || ['确定', '取消'],
      title,
      message,
    },
    (result) => {
      if (result === 0) {
        // eslint-disable-next-line no-unused-expressions
        typeof ok === 'function' && ok();
      } else {
        // eslint-disable-next-line no-unused-expressions
        typeof cancel === 'function' && cancel();
      }
    }
  );
};
