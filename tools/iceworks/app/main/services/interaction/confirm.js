const { dialog } = require('electron');

module.exports = ({ title, message, buttons, type }, ok, cancel) => {
  let win = windows && windows.home;
  dialog.showMessageBox(
    win ? win : undefined,
    {
      type: type || 'info',
      buttons: buttons || ['确定', '取消'],
      title: title,
      message: message,
    },
    (result) => {
      if (result == 0) {
        typeof ok === 'function' && ok();
      } else {
        typeof cancel === 'function' && cancel();
      }
    }
  );
};
