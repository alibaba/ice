const appSettings = require('electron-settings');
const logger = require('../logger');
const { defaultMaterials = [], isWin } = require('../shared');

const settingsScope = 'userconfig';

const defaultSettings = {
  registry: 'https://registry.npm.taobao.org',
  terminal: isWin ? 'Cmd' : 'Terminal',
  editor: 'VisualStudioCode',
  tone: true,
  shortcutKey: 'CommandOrControl+alt+P',
  // 用户配置的物料源列表
  materials: defaultMaterials,
};

module.exports = {
  withScope(key) {
    return `${settingsScope}.${key}`;
  },
  init() {
    logger.debug(appSettings.file());
    Object.entries(defaultSettings).forEach((option) => {
      const [key, value] = option;
      if (!this.has(key)) {
        this.set(key, value);
      }
    });
  },
  clear() {
    appSettings.set(settingsScope, {});
  },
  set(key, value) {
    appSettings.set(this.withScope(key), value);
  },
  get(key) {
    return appSettings.get(this.withScope(key));
  },
  has(key) {
    return appSettings.has(this.withScope(key));
  },
  getAll() {
    return appSettings.get(settingsScope);
  },
};
