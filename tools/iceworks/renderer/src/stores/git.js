import { observable, action, computed } from 'mobx';
import pathExists from 'path-exists';
import path from 'path';

import GitTools from '../lib/git-tools';

// store
import Projects from './projects';
import { access } from 'fs';

class Git {
  @observable gitTools = null;
  @observable gitIniting = false; // git init 状态
  @observable isGit = false; // 是否是一个 git 仓库
  @observable isRepo = false; // repo 地址是否错误
  @observable loading = true; // 
  @observable originRemote = {};
  @observable remoteUrl = '';
  @observable currentBranch = '';
  @observable status = '';
  @observable currentStep = 0;
  @observable showMainPanel = false;

  @observable branches = [];
  @observable checkoutBranch = '';
  @observable branchOrigin = '';
  @observable branchType = '';

  @observable selectedFiles = []; // 选中的变更文件
  @observable unstagedFiles = []; // 变更的文件
  @observable commitMsg = ''; // 提交信息


  @action
  initTools() {
    const { currentProject = {} } = Projects;
    const cwd = currentProject.clientPath;
    if (cwd) {
      this.gitTools = new GitTools(cwd);
    }
  }

  @action
  async init() {
    try {
      this.gitIniting = true;
      await this.gitTools.run('init');
      // 执行一次init commit，否则获取不到当前分支。
      await this.doEmptyCommit();
      this.gitIniting = false;
      this.nextStep();
      return true;
    } catch (error) {
      this.gitIniting = false;
      return false;
    }
  }
  
  @action
  async doEmptyCommit() {
    await this.gitTools.run('commit', 'init commit', [], {'--allow-empty':null});
  }

  @action
  async checkIsRepo() {
    const { currentProject = {} } = Projects;
    const cwd = currentProject.clientPath;
    try {
      const isRepo = await this.gitTools.run('checkIsRepo');

      const isGit = isRepo && pathExists.sync(path.join(cwd, '.git'));
      if (isGit) {
        let originRemote = await this.gitTools.run('originRemote', true);
        originRemote = originRemote[0] || {};
        const remoteUrl = (originRemote.refs && originRemote.refs.push) || '';
        const branches = await this.gitTools.run('branches');
        const status = await this.gitTools.run('status');

        this.originRemote = originRemote;
        this.remoteUrl = remoteUrl;
        this.currentBranch = branches.current;
        this.status = status;
        this.unstagedFiles = this.getUnstagedFiles(status);
        if (remoteUrl) {
          this.showMainPanel = true;
        } else {
          this.currentStep = 1;
        }
      }
      this.isGit = isGit;
      this.isRepo = isRepo;
      this.loading = false;
    } catch (error) {
      this.isGit = false;
      this.loading = false;
    }
  }

  getUnstagedFiles(status) {
    const statusMap = ['conflicted', 'not_added', 'modified', 'created', 'deleted', 'renamed'];
    let unstagedFiles = [];
    if (status && status.files && status.files.length > 0) {
      statusMap.forEach( item => {
        unstagedFiles = unstagedFiles.concat(status[item]);
      });
    }
    return unstagedFiles;
  }

  @action
  async getOriginRemote() {
    return await this.gitTools.run('originRemote');
  }

  @action
  async removeRemote() {
    return await this.gitTools.run('removeRemote', 'origin');
  }

  @action
  async addRemote(remoteUrl) {
    try {
      this.gitRemoteAdding = true;
      await this.gitTools.run('addRemote', 'origin', remoteUrl);
      this.gitRemoteAdding = false;
      return true;
    } catch (error) {
      this.gitRemoteAdding = false;
      return false;
    }
  }
  @action
  async add() {
    await this.gitTools.run('add', this.selectedFiles);
  }

  @action
  async commit() {
    await this.gitTools.run('commit', this.commitMsg);
  }

  @action
  async addAndCommit() {
    try {
      this.gitCommitting = true;
      await this.add();
      await this.commit();
      this.gitCommitting = false;
      this.resetCommit();
      return true;
    } catch (error) {
      this.gitCommitting = false;
      this.resetCommit();
      return false;
    }
  }

  @action
  resetCommit() {
    this.selectedFiles = [];
    this.commitMsg = '';
  }

  @action
  gitFormReset() {
    this.branches = [];
    this.checkoutBranch = '';
    this.branchOrigin = '';
    this.branchType = '';
    this.selectedFiles = [];
    this.commitMsg = '';
  }

  @action
  nextStep() {
    const s = this.currentStep + 1;
    this.currentStep = s > 2 ? 2 : s
  }

}

export default new Git();
