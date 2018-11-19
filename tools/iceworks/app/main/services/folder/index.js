const { shell, dialog } = require('electron');

module.exports = {
  /**
   * 在文件夹中打开
   *
   * @param {String} path 文件路径
   */
  open: (path) => {
    shell.showItemInFolder(path);
  },
  /**
   * 打开文件夹选择器，默认支持创建新文件夹
   *
   * @param {Array} properties 文件夹选项参数
   */
  selector: (properties = ['openDirectory', 'createDirectory']) => {
    return new Promise((resolve, reject) => {
      dialog.showOpenDialog({ properties: properties }, (paths) => {
        if (paths && paths.length > 0) {
          resolve(paths);
        } else {
          reject();
        }
      });
    });
  },
};
