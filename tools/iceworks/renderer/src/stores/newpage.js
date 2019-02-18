import { observable, action, computed } from 'mobx';
import path from 'path';
import { ipcRenderer } from 'electron';

import { scanPages } from '../lib/project-utils';
// store
import progress from './progress';
import projects from './projects';
import EventEmitter from 'events';

import projectScripts from '../lib/project-scripts';
import scanLayout from '../datacenter/scanLayout';

// useStrict(true); // 严格模式，只能内部修改值

// tog 下面这个配置应该移动出来单独存放
// 由于快速修复线上 bug 等正式版将其移走
// XXX 不在白名单里的 Layout 直接返回

/**
 * 新建页面
 */
class NewPage extends EventEmitter{
  @observable
  layouts = []; // 所有 layouts
  @observable
  loading = true;
  @observable
  currentLayout = []; // 当前选中的 layout
  @observable
  visible = false; // 控制弹窗展示
  @observable
  savePageVisible = false; // 控制 page 保存 dialog 的显示
  @observable
  isCreatingValue = false; // 用于控制 pageConfig 确定按钮 loading 状态
  @observable
  createProcess = '';
  @observable
  createProcessEventName = ''; // 新建页面过程中的事件名
  @observable
  progressVisible = false;

  constructor() {
    super();
    ipcRenderer.on('processTracking', (event, process, eventName) => {
      progress.setStatusText(process) 
      progress.setShowTerminal(eventName === 'installBlockDeps');
    });
    ipcRenderer.on('progressVisible', (event, visible) => {
        progress.setShowProgress(visible);
    });
  }


  @computed
  get isCreating() {
    return this.isCreatingValue;
  }

  set isCreating(value) {
    this.isCreatingValue = value;
  }

  @action
  openSave() {
    this.savePageVisible = true;
  }

  @action
  closeSave() {
    this.savePageVisible = false;
  }

  @action
  toggle() {
    if (!this.targetPath) {
      console.error('新建页面未设置 targetPath');
    } else {
      this.visible = !this.visible;
      // 每次展开更新数据
      if (this.visible) {
        this.reset();
        this.fetch();

        const p = projects.currentProject;
        const applicationType = p.getApplicationType();
        const libraryTYpe = p.getLibraryType();
        // react 项目不启动服务
        if (!(libraryTYpe == 'react' && applicationType == 'react')) {
          projectScripts.start(p);
        }
      }
    }
  }

  get targetPath() {
    return projects.currentProject.clientPath;
  }

  @action
  fetch() {
    const destDir = projects.currentProject.clientSrcPath;
    const type = projects.currentProject.getLibraryType(); // 当前项目框架库类型
    this.loading = true;
    Promise.all([
      scanLayout({ targetPath: destDir }),
      scanPages(destDir),
    ])
      .then(this.fetchSuccess)
      .catch(this.fetchFailed);
  }

  // fetch success 回调
  @action.bound
  fetchSuccess([layouts, pages]) {
    const projectPkgData = projects.currentProject.getPkgData();
    console.log('scaned layouts', layouts);

    const scaffoldConfig =
      (projectPkgData && projectPkgData.scaffoldConfig) || {};

    console.log('scaffoldConfig data', scaffoldConfig);

    const defaultLayout = scaffoldConfig.defaultLayout;

    const localLayouts = layouts.filter((n) => n.localization);

    console.log('localLayouts', localLayouts, defaultLayout);

    let currentLayout = layouts[0];
    if (Array.isArray(localLayouts) && localLayouts.length) {
      if (defaultLayout) {
        currentLayout =
          localLayouts.find((l) => l.folderName == defaultLayout) ||
          localLayouts[0];
      } else {
        currentLayout = localLayouts[0];
      }
    }

    this.layouts = layouts;
    this.currentLayout = currentLayout;
    this.pages = pages; // 获取页面数，用于生产页面时，默认的页面名
    this.loading = false;
  }
  // fetch failed 回调
  @action.bound
  fetchFailed(...args) {
    this.loading = false;
    console.log(args);
  }

  @action
  reset() {
    this.pages = []; // 当前项目所有 page
    this.layouts = []; // 所有 layout 列表
  }

  @action
  setCurrentLayout(layout) {
    this.currentLayout = layout;
  }


}

export default new NewPage();
