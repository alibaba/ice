/**
 * 插件内容管理
 * 数据存储在 localStorage 里，通过插件的启用切换在项目面板中展示
 */

import { observable, action, autorun, computed, toJS } from 'mobx';
import services from '../services';

import projects from './projects';

const { settings } = services;

class Extensions {
  @observable
  orderByNameValue = [];
  @observable
  isSorting = false;

  constructor() {
    this.list = [
      {
        name: 'pages',
        cover: require('../static/pages@3x.png'), // 1x1 的封面图
        title: '页面列表',
        description:
          '展示当前项目中 pages 目录下的所有页面，新建页面快捷入口，支持对已有页面下载区块。',
        author: 'ICE TEAM',
        version: '1.0.0',
      },
      {
        name: 'layout-builder',
        cover: require('../static/layout-builder@3x.png'), // 1x1 的封面图
        title: '布局列表',
        description: '展示当前项目中 layouts 目录下的所有布局。',
        author: 'ICE TEAM',
        extra: '仅支持 react 项目',
        version: '1.0.0',
        conditions: {
          libraryType: 'react',
        },
      },
      {
        name: 'proxies',
        cover: require('../static/prories@3x.png'), // 1x1 的封面图
        title: '代理配置',
        description:
          '自定义代理规则，支持多种规则并存、规则切换，设置代理后重启应用，项目中的 GET、POST 请求命中规则时则被代理到对应的地址。代理地址注意需要支持 CORS 跨域请求哦。',
        author: 'ICE TEAM',
        version: '1.0.0',
        extra: 'cli 需 ice-scripts',
        conditions: {
          libraryType: 'react',
          applicationType: 'ice',
        },
      },
      {
        name: 'todo',
        cover: require('../static/todo@3x.png'), // 1x1 的封面图
        title: 'TODO',
        description:
          '收集项目源代码中的 TODO、FIXME等注释信息，提醒您项目中还有什么工作没有完成。',
        author: 'ICE TEAM',
        version: '1.0.0',
      },
      {
        name: 'dependencies',
        cover: require('../static/packages@3x.png'), // 1x1 的封面图
        title: '依赖管理',
        description:
          '探测项目中依赖是否已安装，以及依赖安装的版本，支持快捷安装项目依赖；支持一键更新依赖的操作，当依赖出现新版时可用。',
        author: 'ICE TEAM',
        version: '1.0.0',
      },
      {
        name: 'assets',
        cover: require('../static/assets@3x.png'), // 1x1 的封面图
        title: '构建结果',
        description: '展示项目的构建结果，文件名、文件大小等信息。',
        author: 'ICE TEAM',
        version: '1.0.0',
      },
    ];

    const gitConfig = {
      name: 'git',
      cover: require('../static/def@3x.png'), // 1x1 的封面图
      title: 'Git 面板',
      description: '关联项目的 git 仓库',
      author: 'ICE TEAM',
      version: '1.0.0',
    }

    const isAlibaba = settings.get('isAlibaba');

    if (isAlibaba) {
      this.list.unshift({
        name: 'def',
        cover: require('../static/def@3x.png'), // 1x1 的封面图
        title: 'DEF 前端发布',
        description: '支持阿里内网 DEF 发布构建流程，发布到日常以及线上。',
        author: 'ICE TEAM',
        version: '1.0.0',
      }, gitConfig);
    } else {
      this.list.push({
        name: 'aliyun',
        cover: require('../static/assets@3x.png'), // 1x1 的封面图
        title: '阿里云 OSS',
        description: '将项目构建结果上传到阿里云 OSS。',
        author: 'ICE TEAM',
        version: '1.0.0',
      }, gitConfig);
    }

    const checked = {};
    this.list.forEach((extension) => {
      const extensionStorageValue = localStorage.getItem(
        `extension:${extension.name}`
      );

      if (extensionStorageValue && typeof extensionStorageValue === 'string') {
        checked[extension.name] = extensionStorageValue == 'true';
      } else {
        // 默认开启
        checked[extension.name] = true;
      }
    });

    this.checked = observable(checked);
    this.refreshExtensions();

    const orderByNameWatcher = computed(() => {
      return this.orderByName;
    });

    autorun(() => {
      const orderByName = orderByNameWatcher.get();
      localStorage.setItem('extensions:order', JSON.stringify(orderByName));
    });

    projects.on('change', () => {
      this.refreshExtensions();
    });
  }

  @computed
  get orderByName() {
    return toJS(this.orderByNameValue);
  }

  set orderByName(value) {
    this.orderByNameValue = value;
  }

  @action
  refreshExtensions() {
    this.orderByNameValue = this.sortByUserStore(
      this.getEnableAndAvailableNames()
    );
  }

  @action
  switch(name, value) {
    this.checked[name] = value;
    this.refreshExtensions();
    localStorage.setItem(`extension:${name}`, value);
  }

  @action
  sortStart() {
    this.isSorting = true;
  }

  @action
  sortEnd() {
    this.isSorting = false;
  }

  checkEnable({ name }) {
    if (this.checked[name]) {
      return true;
    }
    return false;
  }

  checkAvailable({ name, ...other }) {
    const extension = this.list.find((item) => {
      return item.name == name;
    });
    if ('conditions' in extension) {
      return Object.keys(extension.conditions).every((key) => {
        return extension.conditions[key] == other[key];
      });
    }
    return true;
  }

  getEnableAndAvailableNames() {
    const allNames = this.list.map((e) => e.name);
    const enableNames = allNames.filter((name) => {
      return this.checkEnable({ name });
    });
    const { currentProject } = projects;
    if (currentProject) {
      const libraryType = currentProject.getLibraryType();
      const applicationType = currentProject.getApplicationType();
      const availableNames = enableNames.filter((name) => {
        return this.checkAvailable({ name, libraryType, applicationType });
      });
      return availableNames;
    }
    return enableNames;
  }

  sortByUserStore(names = []) {
    let extensionsOrder = localStorage.getItem('extensions:order');
    if (extensionsOrder) {
      try {
        extensionsOrder = JSON.parse(extensionsOrder);
      } catch (e) {} // eslint-disable-line no-empty
    }
    if (!(Array.isArray(extensionsOrder) && extensionsOrder.length > 0)) {
      extensionsOrder = [];
    }
    // 保留用户的排序
    const keepOrder = extensionsOrder.filter((n) => {
      return names.includes(n);
    });
    // 多余的排序
    const excludeOrder = names.filter((n) => {
      return !keepOrder.includes(n);
    });
    // 调整 Git 插件顺序，开启 Git 插件之后保证其在 Def 面板之后，不存在则跳过。
    if (excludeOrder.includes('git')) {
      if (keepOrder.includes('def')) {
        keepOrder.splice(keepOrder.indexOf('def')+1, 0, 'git');
        excludeOrder.splice(excludeOrder.indexOf('git'), 1);
      } else if (excludeOrder.includes('def')) {
        excludeOrder.splice(excludeOrder.indexOf('git'), 1);
        excludeOrder.splice(keepOrder.indexOf('def')+1, 0, 'git');
      }
    }

    return keepOrder.concat(excludeOrder);
  }
}

export default new Extensions();
