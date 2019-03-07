/**
 * 用于管理物料加载与缓存的数据中心。
 */

import { observable, action, computed, toJS , autorun, extendObservable} from 'mobx';
import { Dialog } from '@icedesign/base';
import requestMaterial from '../lib/request-material';

import AdditionalBlocks from './additional-blocks';
import AdditionalScaffolds from './additional-scaffolds';
import filterMaterial from '../lib/filter-material';
import services from '../services';

const { settings, shared, log } = services;

class Materials {
  @observable
  materials = [];
  @observable
  refreshing = false;
  @observable
  tabBlockActiveKey = '';
  @observable
  tabScaffoldActiveKeyValue = '';
  @observable
  startRecommendMaterials = {};

  constructor() {
    // 加载物料数据
    this.fetchSettingsMaterials().then(() => {});
  }

  // 刷新数据
  @action
  refresh() {
    this.refreshing = true;
    this.fetchSettingsMaterials().then(() => {
      this.refreshing = false;
      this.initMaterials();
    });
  }

  @action
  setBlockTabActiveKey(key, load = true) {
    this.tabBlockActiveKey = key;
    const index = key.split('_')[1];
    if (load) {
      this.loaderMaterial(index);
    }
  }

  @action
  setScaffoldTabActiveKey(key, load = true) {
    this.tabScaffoldActiveKeyValue = key;
    const index = key.split('_')[1];
    if (load) {
      this.loaderMaterial(index);
    }
  }

  initMaterials() {
    this.setBlockTabActiveKey(this.getBlockTabActiveKey(0), false);
    this.setScaffoldTabActiveKey(this.getScaffoldTabActiveKey(0), false);

    // 加载第一个物料
    this.loaderMaterial(0);
  }

  getBlockTabActiveKey(index) {
    return `block_${index}`;
  }

  getScaffoldTabActiveKey(index) {
    return `scaffold_${index}`;
  }

  @computed
  get tabScaffoldActiveKey() {
    if (this.materials.length === 0) {
      return 'custom-scaffold';
    }
    return this.tabScaffoldActiveKeyValue;
  }

  fetchSettingsMaterials() {
    return new Promise((resolve) => {
      let materials = settings.get('materials');

      // 过滤掉隐藏的物料源
      materials = materials.filter((item) => item.checked !== false);

      materials = filterMaterial(materials);
      this.materials = observable.array(materials);
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }

  fetchByMaterial(source) {
    return requestMaterial(source);
  }

  /**
   * 启动页推荐模板
   */
  @action
  loadStartRecommendMaterials() {
    const recommendMaterialSource = settings.get('materials')[0];
    const isMaterialsBackup = settings.get('isMaterialsBackup');
    const startRecommendMaterials = this.startRecommendMaterials;
    const source = isMaterialsBackup ? recommendMaterialSource.backupSource : recommendMaterialSource.source;
    this.fetchByMaterial(source)
      .then((body = {}) => {
        const scaffolds = body.scaffolds || [];
        const { startRecommendScaffolds } = new AdditionalScaffolds(scaffolds);

        startRecommendMaterials.scaffolds = startRecommendScaffolds || [];
        startRecommendMaterials.loaded = true;
        startRecommendMaterials.error = null;
      })
      .catch((error) => {
        // 如果alicdn物料源访问超时 切换备份物料源
        if (
          error.code && 
          (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')
        ) {
          if (!isMaterialsBackup) {
            this.switchToBackupMaterials(this.loadStartRecommendMaterials.bind(this));
          } else {
            startRecommendMaterials.loaded = true;
            const url = recommendMaterialSource.source;
            startRecommendMaterials.error = `物料源加载失败，请确认网络是否能直接访问此链接 ${url}，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`
          }
        } else {
            startRecommendMaterials.loaded = true;
            startRecommendMaterials.error = `物料源加载失败，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`;
        }
      });
  }

  switchToBackupMaterials(fn = ()=>{}) {
    settings.set('isMaterialsBackup', true);
    fn();
  }

  @action
  loaderMaterial(index) {
    const material = this.materials[index];
    if (!material) return;
    const isMaterialsBackup = settings.get('isMaterialsBackup');
    const source = isMaterialsBackup ? material.backupSource : material.source;

    // 当前物料是否已加载过
    if (material && !material.loaded) {
      this.fetchByMaterial(source)
        .then((body = {}) => {
          const {
            blocks = [],
            scaffolds = [],
            name,
            ...attrs
          } = body;

          Object.keys(attrs).forEach((key) => {
            material[key] = attrs[key];
          });

          // 双向绑定数据
          material.blocks = new AdditionalBlocks(blocks);
          material.scaffolds = new AdditionalScaffolds(scaffolds, material);

          material.loaded = true;
          material.data = body;
          material.error = null;
        })
        .catch((error) => {
          // 如果alicdn物料源访问超时 切换备份物料源
          if (
            error.code && 
            (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')
          ) {
            if (!isMaterialsBackup) {
              this.switchToBackupMaterials(this.loaderMaterial.bind(this));
            } else {
              material.loaded = true;
              const url = material.source;
              const errMsg = `物料源加载失败，请确认网络是否能直接访问此链接 ${url}，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`;
              material.error = errMsg;
            }
          } else {
              material.loaded = true;
              const errMsg = `物料源加载失败，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`;
              material.error = errMsg;
          }
        });
    }
  }

  @computed
  get currentBlocks() {
    const index = this.tabBlockActiveKey.split('_')[1];
    if (index) {
      const material = this.materials[index];
      return toJS(material.data && material.data.blocks) || null;
    }
    return null;
  }

  @computed
  get currentScaffolds() {
    const index = this.tabScaffoldActiveKeyValue.split('_')[1];
    if (index) {
      const material = this.materials[index];
      return toJS(material.data && material.data.scaffolds) || null;
    }
    return null;
  }
}

export default new Materials();
