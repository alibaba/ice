import { computed, toJS, observable } from 'mobx';
import upperCamelCase from 'uppercamelcase';
import { isIceMaterial } from '../lib/utils';

import projects from './projects';

class AdditionalComponents {
  @observable
  activeCategory = '全部';
  @observable
  componentsValue = [];

  constructor(components, material, iceBaseComponents) {
    this.material = material || '';
    this.iceBusinessComponents = components;
    this.iceBaseComponents = iceBaseComponents || [];
    this.additionalSource(components, this.iceBaseComponents);
    this.additionalIsDownloaded(components, this.iceBaseComponents);
    this.componentsValue = components.concat(this.iceBaseComponents);
  }

  additionalSource = (components, iceBaseComponents) => {
    // 如果是飞冰物料，同时是基础组件
    if (isIceMaterial(this.material.source) && iceBaseComponents.length > 0) {
      const { currentProject } = projects;
      const iceVersion = currentProject ? currentProject.iceVersion : '1.x';
      const npm = iceVersion === '0.x' ? '@icedesign/base' : '@alifd/next';
      iceBaseComponents.forEach((component) => {
        component.source = {
          npm,
        };
      });
    }
    components.forEach((component) => {
      const { source = {}, importStatement, name } = component;
      if (!importStatement) {
        const cn = name.split('/').pop();
        component.importStatement = `import ${upperCamelCase(cn)} from '${source.npm}';`;
      } else {
        component.importStatement = importStatement;
      }
    });
  }

  additionalIsDownloaded = (components, iceBaseComponents) => {
    const { currentProject } = projects;
    let dependencies = {};
    if (currentProject) {
      const projectPkgData = currentProject.getPkgData();
      dependencies = projectPkgData.dependencies || {};
    }
    // 如果是飞冰物料，同时是基础组件
    if (isIceMaterial(this.material.source) && iceBaseComponents.length > 0) {
      const iceVersion = currentProject ? currentProject.iceVersion : '1.x';
      const npm = iceVersion === '0.x' ? '@icedesign/base' : '@alifd/next';
      const isDownloaded = !!dependencies[npm];
      iceBaseComponents.forEach((component) => {
        component.isDownloaded = isDownloaded;
      });
    }
    components.forEach((component) => {
      const { source = {} } = component;
      if (dependencies[source.npm]) {
        component.isDownloaded = true;
      } else {
        component.isDownloaded = false;
      }
    });
  }

  /**
   * 获取模板的分类
   */
  @computed
  get categories() {
    // 默认展示全部
    if (isIceMaterial(this.material.source)) {
      return ['全部', '业务组件', '基础组件'];
    }

    const categories = [];

    this.componentsValue.forEach((item) => {
      if (Array.isArray(item.categories)) {
        item.categories.forEach((currentValue) => {
          if (!categories.includes(currentValue)) {
            categories.push(currentValue);
          }
        });
      }
    });

    if (categories.length > 0) {
      categories.unshift('全部');
    }

    return categories;
  }

  @computed
  get values() {
    if (this.activeCategory === '全部') {
      return this.components;
    }
    if (isIceMaterial(this.material.source)) {
      if (this.activeCategory === '业务组件') {
        return this.iceBusinessComponents;
      }
      // this.activeCategory === '基础组件'
      return this.iceBaseComponents;
    }
    const filterByCatefory = this.components.filter((item) => {
      if (item.categories.includes(this.activeCategory)) {
        return item;
      }
      return false;
    });

    return toJS(filterByCatefory);
  }

  @computed
  get components() {
    return toJS(this.componentsValue);
  }
}

export default AdditionalComponents;
