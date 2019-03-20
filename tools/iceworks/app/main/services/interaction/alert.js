// Packages
const { dialog } = require('electron');

module.exports = ({ title, message }) => {
  // eslint-disable-next-line no-undef
  const win = windows && windows.home;

  dialog.showMessageBox(win, {
    type: 'error',
    title,
    message,
  });
};
