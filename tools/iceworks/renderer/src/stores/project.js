import { observable, action, computed } from 'mobx';
import { remote } from 'electron';
import fs from 'fs-extra';
import os from 'os';
import Path from 'path';
import pathExists from 'path-exists';
import semver from 'semver';

import { getDefaultProjectName } from '../lib/project-utils';
const IceworksScaffolder = remote.require('@icedesign/iceworks-scaffolder');

const homeDir = os.homedir();

/**
 * 项目状态存储管理，以所在目录为唯一坐标值。
 */

class Project {
  @observable
  hasScriptsBuild = false; // build 命令
  @observable
  hasScriptsStart = false; // start 命令
  @observable
  isDependenciesInstalling = false; // 所有项目安装中
  @observable
  isPageCreating = false;
  @observable
  isProjectExist = true;
  @observable
  isRepairing = false;
  @observable
  projectName = '';
  @observable
  pkgData = {};
  @observable
  logs = [];
  @observable
  terminalVisible = false;
  /**
   * 服务状态
   *
   * @enum {string} ['normal', 'starting', 'working', 'stop', 'notexist', 'failed']
   */
  @observable
  statusDev = 'normal';
  @observable
  statusBuild = 'normal';
  @observable
  serverUrl = '';
  @observable
  serverPort = 4444;
  @observable
  statusCompile = 'normal'; // 项目的编译状态
  @observable
  statusCompileProgress = 0; // 编译进度
  @observable
  statusCloudBuild = 'normal'; // 编译进度
  @observable
  needInstallDeps = false; // 是否为新项目? 新项目首次打开提示安装依赖
  @observable
  nodeFramework = ''; //服务端模板类型

  // data
  @observable
  layouts = [];

  constructor({ path, needInstallDeps = false }) {
    this.root = path;
    this.needInstallDeps = needInstallDeps;
    this.pkgData = this.getPkgData();

    this.isProjectExist = !!this.pkgData;
    // 初始化判断项目状态
    if (!this.isProjectExist) {
      this.statusDev = 'notexist';
    }

    this.projectName =
      (this.pkgData && this.pkgData.title) ||
      getDefaultProjectName(this.fullPath);

    this.hasScriptsStart = !!(
      this.pkgData &&
      this.pkgData.scripts &&
      this.pkgData.scripts.start
    );
    this.hasScriptsBuild = !!(
      this.pkgData &&
      this.pkgData.scripts &&
      this.pkgData.scripts.build
    );

    this.nodeFramework = this.validateNodeProject();

    this.scaffold = new IceworksScaffolder({
      cwd: this.root,
      interpreter: function({ type, message, data }, next) {
        console.log(type, message, data);
        switch (type) {
          case 'EMTPY_PAGE_TEMPLATE':
            next(false);
            break;
          default:
            next(true);
        }
      },
    });
  }

  /**
   * 相对 os.homedir() 的路径
   */
  get path() {
    return `~/${Path.relative(homeDir, this.root)}`;
  }

  /**
   * 完整路径
   */
  get fullPath() {
    return this.root;
  }

  /**
   * 获取 package.json 文件内容
   * @return Object package.json content
   */
  getPkgData() {
    const pkgPath = Path.join(this.root, 'package.json');
    try {
      let pkgData = fs.readFileSync(pkgPath);
      pkgData = JSON.parse(String(pkgData));
      return pkgData;
    } catch (e) {
      console.error(pkgPath + ' 不存在');
      return null;
    }
  }

  @action
  updatePkgData() {
    const newPkgData = this.getPkgData();
    this.pkgData = newPkgData;
    this.isProjectExist = !!this.pkgData;
    // 初始化判断项目状态
    if (!this.isProjectExist) {
      this.statusDev = 'notexist';
    } else {
      this.statusDev = 'normal';
    }

    this.projectName =
      (this.pkgData && this.pkgData.title) ||
      getDefaultProjectName(this.fullPath);

    this.hasScriptsStart = !!(
      this.pkgData &&
      this.pkgData.scripts &&
      this.pkgData.scripts.start
    );
    this.hasScriptsBuild = !!(
      this.pkgData &&
      this.pkgData.scripts &&
      this.pkgData.scripts.build
    );
  }

  /**
   * 获取项目类型，返回 react / vue 等，
   * 以项目的框架语言为特征
   * @enum ['vue', 'react', '']
   */
  getLibraryType() {
    const pkgData = this.getPkgData();
    let defaultType = 'react';

    if (!pkgData) {
      return defaultType;
    }

    const libraryType =
      pkgData && pkgData.scaffoldConfig && pkgData.scaffoldConfig.type;

    if (libraryType) {
      return libraryType;
    }

    const dependencies = pkgData.dependencies || {};
    const devDependencies = pkgData.devDependencies || {};

    const allDeps = Object.keys(dependencies).concat(
      Object.keys(devDependencies)
    );
    // 特征检测
    const vueDeps = ['@vue/cli-service', 'vue'];
    const reactDeps = ['ice-scripts'];
    const angularDeps = ['@angular/cli'];
    // 不够通用的逻辑
    const hasVue = vueDeps.some((d) => allDeps.includes(d));
    const hasReact = reactDeps.some((d) => allDeps.includes(d));
    const reactWithoutIce =
      this.pkgData.templateType &&
      this.pkgData.templateType === 'react';
    const hasAngularCli = angularDeps.some((d) => allDeps.includes(d));

    if (hasVue) {
      defaultType = 'vue';
    } else if (hasReact) {
      defaultType = 'react';
    } else if (reactWithoutIce) {
      defaultType = 'react';
    } else if (hasAngularCli) {
      defaultType = 'angular';
    }

    return defaultType;
  }

  /**
   * 获取项目应用类型，返回 react/ ice / angular / rax 等，
   * 以项目的脚手架来判断
   * @enum ['ice', 'react']
   *  - react 表示社区数据
   *  - ice 表示为相关脚手架
   */
  getApplicationType() {
    const pkgData = this.getPkgData();
    let defaultType = '';

    if (!pkgData) {
      return defaultType;
    }

    const scaffoldConfig = pkgData.scaffoldConfig || {};
    const dependencies = pkgData.dependencies || {};
    const devDependencies = pkgData.devDependencies || {};

    if (scaffoldConfig.appType) {
      return scaffoldConfig.appType;
    }

    const allDeps = Object.keys(dependencies).concat(
      Object.keys(devDependencies)
    );
    // 特征检测
    const vueDeps = ['@vue/cli-service', 'vue'];
    const reactDeps = ['ice-scripts'];
    const angularDeps = ['@angular/cli'];
    // 不够通用的逻辑
    const hasVue = vueDeps.some((d) => allDeps.includes(d));
    const hasReact = reactDeps.some((d) => allDeps.includes(d));
    const reactWithoutIce =
      this.pkgData.templateType &&
      this.pkgData.templateType === 'react';
    const customIceMaterial =
      this.pkgData.templateType &&
      this.pkgData.templateType === 'custom';
    const hasAngularCli = angularDeps.some((d) => allDeps.includes(d));

    if (hasVue) {
      defaultType = 'ice';
    } else if (hasReact) {
      defaultType = 'ice';
    } else if (customIceMaterial) {
      defaultType = 'ice';
    } else if (reactWithoutIce) {
      defaultType = 'react';
    } else if (hasAngularCli) {
      defaultType = 'angular';
    }

    return defaultType;
  }

  @action
  batchUpdate(data) {
    for (const key in data) {
      this[key] = data[key];
    }
  }

  // 启动调试服务
  @action
  devStart() {
    this.statusDev = 'working';
    this.statusCompileProgress = 0;
  }
  // 停止调试服务
  @action
  devStop() {
    this.statusDev = 'stop';
    this.statusCompileProgress = 0;
    this.serverUrl = '';
  }
  @action
  buildStart() {
    this.statusBuild = 'building';
  }
  @action
  buildDone() {
    this.statusBuild = 'done';
  }
  @action
  buildFailed() {
    this.statusBuild = 'failed';
  }

  @action
  repairStart() {
    this.isRepairing = true;
  }
  @action
  repairDone() {
    this.isRepairing = false;
  }

  @action
  installStart() {
    this.isDependenciesInstalling = true;
  }
  @action
  installDone() {
    this.isDependenciesInstalling = false;
  }

  @action
  toggleTerminal() {
    this.terminalVisible = !this.terminalVisible;
  }

  @action
  setNeedInstallDeps(value) {
    this.needInstallDeps = value;
  }

  @action
  setCloudBuild(value) {
    this.statusCloudBuild = value;
  }

  // 获取状态
  @computed
  get isWorking() {
    return this.statusDev === 'working';
  }
  // 操作不可用
  @computed
  get actionDisabled() {
    return (
      !this.isProjectExist || this.isRepairing || this.isDependenciesInstalling
    );
  }

  /** 检测项目可用性 */
  @computed
  get isUnavailable() {
    if (!this.pkgData) {
      return true;
    }
    const icescriptsRequired =
      this.pkgData.devDependencies &&
      (this.pkgData.devDependencies['ice-scripts'] ||
        this.pkgData.devDependencies['@vue/cli-service']);

    // support create-react-app
    const reactWithoutIceValidate =
      this.pkgData.templateType &&
      this.pkgData.templateType === 'react';

    // 关键字匹配，存在 ice-scaffold 字符表示适配 iceworks
    const keywordsHasIce = (this.pkgData.keywords || []).includes(
      'ice-scaffold'
    );

    const icesdriptsVersion = semver.valid(semver.coerce(icescriptsRequired));

    // todo vue cli 是被 hack 通过检测，需要后面抽出套机进行处理
    const icescriptsAvailable =
      icescriptsRequired === 'latest' ||
      icescriptsRequired === 'beta' ||
      (icesdriptsVersion && semver.gte(icesdriptsVersion, '1.0.0'));

    const unavailable = !(
      this.exists &&
      this.isProjectExist &&
      this.hasScriptsBuild &&
      this.hasScriptsStart &&
      !this.isRepairing &&
      (icescriptsAvailable || reactWithoutIceValidate || keywordsHasIce)
    );

    return unavailable;
  }

  get exists() {
    return pathExists.sync(this.fullPath);
  }

  validateNodeProject() {
    if (this.pkgData) {
      if (this.pkgData.templateType === 'Koa' || this.pkgData.templateType === 'koa') {
        return 'koa';
      } else if (this.pkgData.templateType === 'midway') {
        return 'midway';
      } else {
        return '';
      }
    }
  }
}

export default Project;
