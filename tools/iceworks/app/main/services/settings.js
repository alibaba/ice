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
  // 是否使用备用物料源
  isMaterialsBackup: false,
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
      } else if (key === 'materials') {
        // 重置用户本地的物料源配置，添加加了备份地址，保留原有额外设置，比如checked
        const oldMaterials = this.get('materials');
        const sourceToBackup = {};
        defaultMaterials.forEach( obj => {
          if (obj.backupSource) {
            sourceToBackup[obj.source] = obj.backupSource;
          }
        });
        const newMaterials = oldMaterials.map((material) => {
          const backupSource = sourceToBackup[material.source];
          if (backupSource) {
            material.backupSource = backupSource;
          }
          return material;
        });
        this.set(key, newMaterials);
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
