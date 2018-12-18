import { observable, action, computed, toJS } from 'mobx';
import uuidv1 from 'uuid/v1';

import {
  calcPrimaryColors,
  calcSecondaryColor,
} from '../packages/theme-colors';

/**
 * 自定义脚手架状态管理
 */

const RECENT_KEY = 'scaffold:recentV2';

const DEFAULT_SCAFFOLD = {};

const DEFAULT_LAYOUT_CONFIG = {
  // 模板名称
  name: 'app',

  // 模板类型: layout、redux、mobx
  type: 'redux',

  // 下载到指定的目录
  directory: __dirname,

  // 是否启用自定义模板名称
  enableName: false,

  // 是否启用主题
  enableTheme: true,

  // 布局方式: fluid-layout、boxed-layout
  layout: 'fluid-layout',

  // 主题配置
  themeConfig: {
    theme: 'dark',
    primaryColor: '#3080FE',
    secondaryColor: '#FFC107',
  },

  // 是否启用 Header
  header: {
    position: 'static',
    width: 'full-width',
    enabled: true,
  },

  // 是否启用 Aside
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: true,
  },

  // 是否启用 Footer
  footer: {
    position: 'fixed',
    width: 'full-width',
    enabled: true,
  },

  // Redux 配置
  redux: {
    enabled: true, // 生成基础的 redux 配置文件，默认会同步路由信息到 redux store
    registerLoginModule: false, // 生成注册登录的示例代码
    authorityModule: false, // 生成权限管理的示例代码
    mockModule: false, // 生成简单的 Mock 示例代码
  },

  // Mobx 配置
  mobx: {},
};

class CustomScaffold {
  editScaffoldConigId = null;
  @observable
  visible = false;
  @observable
  scaffoldValue = DEFAULT_SCAFFOLD;
  @observable
  layoutConfigValue = DEFAULT_LAYOUT_CONFIG;
  @observable
  scaffoldConfigStoresValue = []; // 将用户的模板操作记录保存下来

  constructor() {
    this.title = '新建自定义模板';

    let scaffoldConfigStores = localStorage.getItem(RECENT_KEY);
    let scaffoldConfigStoresFilterById = [];
    try {
      scaffoldConfigStores = JSON.parse(scaffoldConfigStores);
      // 以 id 作为存储键值，不存在则清空
      scaffoldConfigStoresFilterById = scaffoldConfigStores.filter(
        (scaffoldConfig) => {
          return Boolean(scaffoldConfig.id);
        }
      );
    } catch (e) {} // eslint-disable-line no-empty

    if (Array.isArray(scaffoldConfigStoresFilterById)) {
      this.scaffoldConfigStores = scaffoldConfigStoresFilterById;
      if (scaffoldConfigStoresFilterById.length !== scaffoldConfigStores) {
        this.saveCustomScaffoldConfigToStores();
      }
    }
  }

  @computed
  get scaffoldConfigStores() {
    return toJS(this.scaffoldConfigStoresValue);
  }

  set scaffoldConfigStores(value) {
    this.scaffoldConfigStoresValue = value;
  }

  @computed
  get scaffold() {
    return toJS(this.scaffoldValue);
  }

  @computed
  get layoutConfig() {
    return toJS(this.layoutConfigValue);
  }

  @computed
  get primaryColors() {
    const primaryColor = this.layoutConfig.themeConfig.primaryColor;
    return calcPrimaryColors(primaryColor);
  }

  @computed
  get secondaryColors() {
    const secondaryColor = this.layoutConfig.themeConfig.secondaryColor;
    return calcSecondaryColor(secondaryColor);
  }

  @action
  reset() {
    this.editScaffoldConigId = null;
    this.scaffoldValue = DEFAULT_SCAFFOLD;
    this.layoutConfigValue = DEFAULT_LAYOUT_CONFIG;
  }

  @action
  toggle() {
    this.visible = !this.visible;
  }

  @action
  close() {
    this.visible = false;
  }

  @action
  open() {
    this.visible = true;
  }

  @action
  setLayoutConfig(value) {
    this.layoutConfigValue = value;
  }

  saveCustomScaffoldConfigToStores() {
    localStorage.setItem(RECENT_KEY, JSON.stringify(this.scaffoldConfigStores));
  }

  /**
   * 添加模板数据到记录中
   * @param {Object} scaffoldConfig 模板数据
   */
  @action
  saveCustomScaffoldConfig(scaffoldConfig) {
    return new Promise((resolve) => {
      let scaffoldConfigStores = this.scaffoldConfigStores;
      if (this.editScaffoldConigId) {
        scaffoldConfigStores = scaffoldConfigStores.map((s) => {
          if (s.id == this.editScaffoldConigId) {
            scaffoldConfig.id = this.editScaffoldConigId;
            return scaffoldConfig;
          }
          return s;
        });
      } else {
        scaffoldConfig.id = uuidv1();
        scaffoldConfigStores.push(scaffoldConfig);
      }
      this.scaffoldConfigStores = scaffoldConfigStores;
      this.saveCustomScaffoldConfigToStores();
      resolve();
    });
  }
  /**
   * 删除模板数据到记录项
   * @param {Number} 模板索引值
   */
  @action
  removeScaffoldConfigByIndex(index) {
    this.scaffoldConfigStores = this.scaffoldConfigStores.filter((a, key) => {
      return key !== index;
    });
    this.saveCustomScaffoldConfigToStores();
  }
  /**
   * 编辑模板数据到记录项
   * @param {Number} 模板索引值
   */
  @action
  editScaffoldConfigByIndex(index) {
    const editScaffoldConfig = this.scaffoldConfigStores.find(
      (scaffoldConfig, k) => k == index
    );
    this.editScaffoldConigId = editScaffoldConfig.id;
    this.setLayoutConfig(editScaffoldConfig.layoutConfig);
    this.toggle();
  }
}

export default new CustomScaffold();
