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

const { settings, shared, scaffolder } = services;

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

  fetchByMaterial(material) {
    return requestMaterial(material.source);
  }

  /**
   * 启动页推荐模板
   */
  loadStartRecommendMaterials() {
    const recommendMaterialSource = shared.defaultMaterials[0];
    const startRecommendMaterials = this.startRecommendMaterials;

    this.fetchByMaterial(recommendMaterialSource)
      .then((body = {}) => {
        const scaffolds = body.scaffolds || [];
        const { startRecommendScaffolds } = new AdditionalScaffolds(scaffolds);

        startRecommendMaterials.scaffolds = startRecommendScaffolds || [];
        startRecommendMaterials.loaded = true;
        startRecommendMaterials.error = null;
      })
      .catch((error) => {
        startRecommendMaterials.loaded = false;
        startRecommendMaterials.error = error;
      });
  }

  loaderMaterial(index) {
    const material = this.materials[index];
    const location = history.location;
    console.log('location ', location)
    // 当前物料是否已加载过
    if (material && !material.loaded) {
      let promiseAll;
      if (isIceMaterial(material.source)) {
        // 根据组件版本获取对应的基础组件物料源
        const { iceVersion } = projects.currentProject;
        const { iceBaseMaterials } = shared;
        const iceBaseMaterial = iceVersion === '0.x' ? iceBaseMaterials[0] : iceBaseMaterials[1];
        promiseAll = Promise.all([
          this.fetchByMaterial(material),
          this.fetchByMaterial(iceBaseMaterial)
        ]);
      } else {
        promiseAll = Promise.all([
          this.fetchByMaterial(material)
        ]);
      }

      promiseAll.then(([
        body = {},
        iceBaseComponents
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
        });
        // 双向绑定数据
        material.blocks = new AdditionalBlocks(blocks);
        material.scaffolds = new AdditionalScaffolds(scaffolds, material);
        material.components = new AdditionalComponents(components, material, iceBaseComponents);

        material.loaded = true;
        material.data = body;
        material.error = null;

      }).catch((error) => {
        material.loaded = false;
        material.error = error;
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
