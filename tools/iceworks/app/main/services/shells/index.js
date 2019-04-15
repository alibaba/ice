const { findShellOrDefault } = require('./lookup');
const { launchShell } = require('./launch');
const exception = require('../../exception');
const shared = require('./shared');
const settings = require('../settings');
const interaction = require('../interaction');

module.exports = {
  shared,
  /**
   * 在终端中打开
   *
   * @param {String} path 打开的文件或者文件夹路径
   */

  open: async (path) => {
    const selectedShell = settings.get('terminal') || null;
    if (selectedShell) {
      interaction.notify({
        title: '正在启动终端',
        body: selectedShell,
      });
    }
    try {
      const match = await findShellOrDefault(selectedShell);
      await launchShell(match, path);
    } catch (error) {
      exception.catch(error);
    }
  },
};
