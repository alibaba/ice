/**
 * 向 window 发送消息，并检测是否 destroy
 * @param {BrowserWIndow} win
 * @param {Any} args
 */
module.exports = (win, ...args) => {
  if (win && !win.isDestroyed()) {
    // eslint-disable-next-line
    win.webContents.send.apply(win.webContents, args);
  }
};
