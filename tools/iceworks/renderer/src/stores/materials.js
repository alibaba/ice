/**
 * 用于管理物料加载与缓存的数据中心。
 */

import { observable, action, computed, toJS } from 'mobx';
import requestMaterial from '../lib/request-material';

import AdditionalBlocks from './additional-blocks';
import AdditionalScaffolds from './additional-scaffolds';
import AdditionalComponents from './additional-components';
import filterMaterial from '../lib/filter-material';
import { isIceMaterial } from '../lib/utils';
import services from '../services';
import history from '../history';
import projects from './projects';

const { settings, shared } = services;

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
  tabComponentActiveKey = '';
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

  @action
  setComponentTabActiveKey(key, load = true) {
    this.tabComponentActiveKey = key;
    const index = key.split('_')[1];
    if (load) {
      this.loaderMaterial(index);
    }
  }

  initMaterials() {
    this.setBlockTabActiveKey(this.getBlockTabActiveKey(0), false);
    this.setScaffoldTabActiveKey(this.getScaffoldTabActiveKey(0), false);
    this.setComponentTabActiveKey(this.getComponentTabActiveKey(0), false);

    // 加载第一个物料
    this.loaderMaterial(0);
  }

  getBlockTabActiveKey(index) {
    return `block_${index}`;
  }

  getScaffoldTabActiveKey(index) {
    return `scaffold_${index}`;
  }

  getComponentTabActiveKey(index) {
    return `component_${index}`;
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
            settings.set('isMaterialsBackup', true);
            this.loadStartRecommendMaterials();
          } else {
            startRecommendMaterials.loaded = true;
            startRecommendMaterials.error = `物料源加载失败，请确认网络是否能直接访问此链接 ${source}，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`;
          }
        } else {
          startRecommendMaterials.loaded = true;
          startRecommendMaterials.error = '物料源加载失败，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题';
        }
      });
  }

  switchToBackupMaterials(fn = () => {}) {
    settings.set('isMaterialsBackup', true);
    fn();
  }

  @action
  loaderMaterial(index) {
    const material = this.materials[index];
    if (!material) return;
    const isMaterialsBackup = settings.get('isMaterialsBackup');
    const source = isMaterialsBackup ? material.backupSource : material.source;

    if (material && !material.loaded) {
      let promiseAll;
      if (isIceMaterial(material.source)) {
        // HACK: 获取 ICE 物料源时一同获取基础组件数据
        const { iceVersion } = projects.currentProject;
        const { iceBaseMaterials } = shared;
        const iceBaseMaterial = iceVersion === '0.x' ? iceBaseMaterials[0] : iceBaseMaterials[1];
        promiseAll = Promise.all([
          this.fetchByMaterial(source),
          this.fetchByMaterial(iceBaseMaterial.source).catch((err) => {
            // 获取基础组件列表失败，不终止流程
            material.componentsError = `基础组件列表加载失败，请确认网络是否能直接访问此链接 ${iceBaseMaterial.source}，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`;
            return null;
          }),
        ]);
      } else {
        promiseAll = Promise.all([
          this.fetchByMaterial(source),
        ]);
      }

      promiseAll.then(([
        body = {},
        iceBaseComponents,
      ]) => {
        const {
          blocks = [],
          scaffolds = [],
          components = [],
          name,
          ...attrs
        } = body;

        Object.keys(attrs).forEach((key) => {
          material[key] = attrs[key];
        })

        // 双向绑定数据
        material.blocks = new AdditionalBlocks(blocks);
        material.scaffolds = new AdditionalScaffolds(scaffolds, material);

        if (iceBaseComponents) {
          material.components = new AdditionalComponents(components, material, iceBaseComponents);
        }

        material.loaded = true;
        material.data = body;
        material.error = null;
      }).catch((error) => {
        console.error('promiseAll.then error', error);
        if (!isMaterialsBackup) {
          settings.set('isMaterialsBackup', true);
          this.loaderMaterial(index);
        } else {
          material.loaded = true;
          const errMsg = `物料源加载失败，请确认网络是否能直接访问此链接 ${source}，建议将此问题反馈给飞冰（ICE）团队，在菜单中点击: 帮助 => 反馈问题`;
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

  @computed
  get currentComponents() {
    const index = this.tabComponentActiveKey.split('_')[1];
    if (index) {
      const material = this.materials[index];
      return toJS(material.data && material.data.components) || null;
    }
    return null;
  }

  @action
  updateComponents() {
    const index = this.tabComponentActiveKey.split('_')[1];
    if (index) {
      const material = this.materials[index];
      const components = material.components.iceBusinessComponents;
      const iceBaseComponents = material.components.iceBaseComponents;
      material.components = new AdditionalComponents(components, material, iceBaseComponents);
    }
  }
}

export default new Materials();
