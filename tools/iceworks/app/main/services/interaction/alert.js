// Packages
const { dialog } = require('electron');

module.exports = ({ title, message }) => {
  const win = windows && windows.home;

  dialog.showMessageBox(win, {
    type: 'error',
    title,
    message,
  });
};
