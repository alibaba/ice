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
        // 重置用户本地的物料源配置，初始化物料源新增字段添加，保留用户设置
        const oldMaterials = this.get('materials');
        const defaultMaterialsObj = {};
        defaultMaterials.forEach( obj => {
          if (obj.backupSource) {
            defaultMaterialsObj[obj.source] = obj;
          }
        });
        const newMaterials = oldMaterials.map((material) => {
          const defaultMaterial = defaultMaterialsObj[material.source];
          if (defaultMaterial) {
            return Object.assign({}, defaultMaterial, material);
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
