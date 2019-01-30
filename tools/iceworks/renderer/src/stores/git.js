import { observable, action, computed } from 'mobx';
import pathExists from 'path-exists';
import path from 'path';
import { Feedback } from '@icedesign/base';

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
  @observable branchesCheckout = [];
  

  @observable selectedFiles = []; // 选中的变更文件
  @observable unstagedFiles = []; // 变更的文件
  @observable commitMsg = ''; // 提交信息

  @observable gitCommitting = false;
  @observable gitNewBranching = false;
  @observable reloading = false;

  // @observable visibleDialogGitConfig = false;
  @observable visibleDialogChangeRemote = false;
  @observable visibleDialogNewBranch = false;
  @observable visibleDialogBranches = false;

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
    const cwd = currentProject.fullPath;
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
console.log('remoteUrl: ', remoteUrl);
console.log('originRemote: ', originRemote);
console.log('currentBranch: ', currentBranch);

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
  async newBranch(value) {
    try {
      this.gitNewBranching = true;
      await this.gitTools.run('checkoutLocalBranch', value);
      this.gitNewBranching = false;
      return true;
    } catch (error) {
      this.gitNewBranching = false;
      return false;
    }
  }

  @action
  async getBranches() {

    Feedback.toast.show({
      type: "loading",
      content: "Git fetching",
    });

    try {
      await this.gitTools.run('fetch');
      const originBranches = await this.gitTools.run('branch', ['--remotes', '--list', '-v']);
      const localBranches = await this.gitTools.run('branches');

      const local = localBranches.all.map((value) => {
        return { label: value, value };
      });
      const origin = originBranches.all.map((value) => {
        return { label: value, value };
      });
      const branchesCheckout = [];
      if (local.length > 0) {
        branchesCheckout.push({
          label: 'local',
          value: 'local',
          children: local,
        });
      }
      if (origin.length > 0) {
        branchesCheckout.push({
          label: 'origin',
          value: 'origin',
          children: origin,
        });
      }
      Feedback.toast.hide();
      if (branchesCheckout.length === 0) {
        Feedback.toast.prompt('本地和远程仓库均无分支，请先 push');
        return;
      }

      this.branchesCheckout = branchesCheckout;
      this.visibleDialogBranches = true;

    } catch (error) {
      Feedback.toast.hide();
      this.visibleDialogBranches = false;
    }
  }

  @action
  async checkout() {
    try {
      await this.gitTools.run('checkout', this.checkoutBranch);
      this.visibleDialogBranches = false;
      return true;
    } catch (error) {
      this.visibleDialogBranches = false;
      return false;
    }
  }

  @action
  async checkoutLocalBranch() {
    try {
      await this.gitTools.run('checkoutBranch', this.checkoutBranch, this.branchOrigin);
      this.visibleDialogBranches = false;
      return true;
    } catch (error) {
      this.visibleDialogBranches = false;
      return false;
    }
  }

  @action
  async push() {
    Feedback.toast.show({
      type: "loading",
      content: "Git push",
    });
    try {
      await this.gitTools.run('push', 'origin', this.currentBranch);
      Feedback.toast.hide();
      return true;
    } catch (error) {
      Feedback.toast.hide();
      return false;
    }
  }

  @action
  async pull() {
    Feedback.toast.show({
      type: "loading",
      content: "Git pull",
    });
    try {
      await this.gitTools.run('pull', 'origin', this.currentBranch);
      Feedback.toast.hide();
      return true;
    } catch (error) {
      Feedback.toast.hide();
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
