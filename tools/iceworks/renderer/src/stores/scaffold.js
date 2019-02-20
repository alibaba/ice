/**
 * 用于创建项目的状态与进度
 */

import { Dialog } from '@icedesign/base';
import { observable, action, computed, toJS } from 'mobx';
import { shell } from 'electron';

import mkdirp from 'mkdirp';
import Notification from '@icedesign/notification';
import os from 'os';
import path from 'path';
import pathExists from 'path-exists';
import React from 'react';

import { checkProject } from '../lib/project-utils';
import customScaffold from './custom-scaffold';
import dialog from '../components/dialog';
import history from '../history';
import services from '../services';

// store
import progress from './progress';

const defaultWorkspacePath = path.join(os.homedir(), 'iceworks-workspace');
const WORKSPACE_KEY = 'iceworks-workspace';

const progressText = {
  ing: '项目文件生成中',
  done: '项目创建完成',
};

class Scaffold {
  @observable
  scaffoldValue = null;
  @observable
  layoutConfigValue = null;
  @observable
  isLegalProjectName = false;  //没有被使用过的变量
  @observable
  projectName = '';
  @observable
  projectFolderName = '';
  @observable
  projectFolderNameValidation = '';
  @observable
  scaffolds = [];
  @observable
  visible = false;
  @observable
  tabScaffoldActiveKey = '';
  @observable
  workspacePath = localStorage.getItem(WORKSPACE_KEY) || defaultWorkspacePath;
  @observable
  nodeFramework = '';
  @observable
  isNode = false;

  get currentScaffoldName() {
    return toJS(this.scaffoldValue).name;
  }

  // 重置状态
  @action
  reset() {
    this.scaffoldValue = null; // 当前模板
    this.layoutConfigValue = null; // 当前模板
    this.projectFolderName = ''; // 生成状态
    this.projectFolderNameValidation = ''; // 生成状态
    this.projectName = '';
    this.visible = false;
    this.nodeFramework = '';
    this.isNode = false;
  }

  // 更新本地缓存项目信息
  @action
  addNewProjectToProjects = (targetPath, needInstallDeps) => {
    this.projects.add(targetPath, needInstallDeps);
  };

  @action
  toggleNodeSelect = (checked) => {
    this.isNode = checked;
  };

  // 修改路由跳转到首页
  @action
  pushRoute(url) {
    this.visible = false;
    customScaffold.close();
    history.push(url);
  }

  // 再次打开目录选择器   没有被使用过的方法
  @action
  reopenDirectory() {
    if (this.scaffoldValue) {
      this.openDirectory();
    }
  }

  @action
  createProjectFolder() {
    const self = this;
    const targetPath = self.getProjectPathWithWorkspace();
    if (!pathExists.sync(targetPath)) {
      mkdirp.sync(targetPath);
    }

    return new Promise((resolve, reject) => {
      mkdirp(targetPath, function(err) {
        if (err) {
          reject(err);
        } else {
          const status = checkProject(targetPath);
          switch (status) {
            case 'legalProject':
              Notification.warning({
                message: '当前目录是可用项目',
                description: '已添加到项目列表顶部',
              });
              self.addNewProjectToProjects(targetPath);
              self.pushRoute('/');
              resolve(false);
              break;
            case 'noAccess':
              Dialog.alert({
                content: '当前目录没有读写权限，请更换项目目录名！',
                closable: false,
                title: '没有权限',
                onOk: () => {
                  // self.reopenDirectory();
                  self.projectFolderName = '';
                  resolve(false);
                },
              });
              break;
            case 'hasFiles':
              Dialog.confirm({
                needWrapper: false,
                locale: {
                  ok: '是',
                  cancel: '继续使用',
                },
                title: '警告',
                content: (
                  <div style={{ width: 300, lineHeight: '32px' }}>
                    <p style={{ margin: 0, padding: '5px 0' }}>{targetPath}</p>
                    <p style={{ margin: 0, padding: '5px 0' }}>
                      当前文件夹不为空，可能会覆盖原有文件，是否更换项目目录名？
                    </p>
                  </div>
                ),
                onOk: () => {
                  // self.reopenDirectory();
                  self.projectFolderName = '';
                  resolve(false);
                },
                onCancel: () => {
                  resolve(true);
                },
              });
              break;
            case 'emptyProject':
              resolve(true);
              break;
            case 'unknown':
              resolve(true);
              break;
          }
        }
      });
    });
  }

  // 打开目录选择器
  @action
  openDirectory() {
    services.folder.selector().then((paths) => {
      if (paths && paths.length > 0) {
        const selectedPath = paths[0];
        this.workspacePath = selectedPath;
        localStorage.setItem(WORKSPACE_KEY, selectedPath);
      }
    });
  }

  @computed
  get isCreating() {
    return progress.visible;
  }

  /**
   * 启动进度条
   */
  @action
  startProgress(SectionCount) {
    progress.setStatusText('项目文件生成中');
    progress.start(true);
    progress.setSectionCount(SectionCount);
  } 

  /**
   * 结束进度条
   */
  endProgress() {
    progress.setStatusText('项目创建完成');
    progress.end();
  }

  resetProgress() {
    progress.reset();
  }

  /** 
   * 开始创建项目
   * @param {String} targetPath 项目地址
   * @param {Object} options 脚手架配置
   */
  @action
  create(targetPath, options) {
    const progressFunc = progress.handleProgressFunc;
    return new Promise((resolve, reject) => {
      services.worker.create.add(
        {
          path: targetPath,
          data: options, 
          progressFunc
        },
        (error /* 返回的 Error | CreateProjectError 实例 */) => {
          // 创建项目弹窗提示
          if (error) {
            dialog.error('创建项目失败', error, () => {
              shell.moveItemToTrash(targetPath);
            });
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  @computed
  get isDisabled() {
    // 以下情况禁用创建按钮
    return (
      !this.scaffoldValue ||
      this.projectFolderName.trim() == '' || // 项目名为空
      this.projectFolderNameValidation !== '' || // 含错误信息
      // !this.isLegalProjectName || // 合法项目名
      (progress && progress.visible )// 非初始状态
    );
  }

  @computed
  get scaffold() {
    return toJS(this.scaffoldValue);
  }

  @computed
  get layoutConfig() {
    return toJS(this.layoutConfigValue);
  }

  @action
  setScaffoldConfig({ scaffold, layoutConfig = null }) {
    this.reset();
    this.installDeps = true;
    this.scaffoldValue = scaffold;
    this.layoutConfigValue = layoutConfig;
  }

  @action
  toggle() {
    this.visible = !this.visible;
  }

  @action
  open() {
    this.visible = true;
  }

  @action
  close() {
    this.visible = false;
  }

  // 中断创建
  abort() {
    progress && progress.abort()
    services.worker.create.destroy();
  }

  @action
  setProjectName(value = '') {
    this.projectName = value;
  }

  @computed
  get projectFinalName() {
    return toJS(this.projectName || this.projectFolderName);
  }

  @action
  setProjectFolderName(value = '') {
    if (value.trim() == '' || !/^[a-z][-_0-9a-z]*$/i.test(value.trim())) {
      this.projectFolderNameValidation = '首字母开头、字母、数字、中下划线组成';
    } else {
      this.projectFolderNameValidation = '';
    }
    this.projectFolderName = value;
  }

  @action
  toggleInstall() {
    this.installDeps = !this.installDeps;
  }

  @action
  toggleNodeProject(value) {
    this.nodeFramework = value;
  }

  getProjectPathWithWorkspace() {
    return path.join(this.workspacePath, this.projectFolderName || '');
  }
}

export default new Scaffold();
