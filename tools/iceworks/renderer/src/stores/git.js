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
  // 初始化状态
  @observable loading = true; // 插件初始化时loading状态
  @observable showMainPanel = false; // 判断是否已经绑定仓库地址，已经绑定则展示主面板，否则展示引导步骤
  // 主要的变更状态
  @observable isGit = false; // 是否是一个 git 仓库
  @observable isRepo = false; // repo 地址是否错误
  @observable originRemote = {}; // gets a list of the named remotes, includes the URLs and purpose of each ref
  @observable remoteUrl = ''; // 当前仓库地址
  @observable currentBranch = ''; // 当前分支
  @observable status = ''; // 当前项目文件状态
  @observable currentStep = 0; // 当前引导步骤
  // 切换分支状态
  @observable branches = [];
  @observable checkoutBranch = '';
  @observable branchOrigin = '';
  @observable branchType = '';
  @observable branchesCheckout = [];
  // 文件选择状态
  @observable selectedFiles = []; // 选中的变更文件
  @observable unstagedFiles = []; // 变更的文件
  @observable commitMsg = ''; // 提交信息
  // loading状态
  @observable gitIniting = false; // git init 状态
  @observable gitCommitting = false;
  @observable gitNewBranching = false;
  @observable reloading = false;
  @observable removeAndAddRemoting = false;
  @observable gitRemoteAdding = false;
  // dialog显示状态
  @observable visibleDialogChangeRemote = false;
  @observable visibleDialogNewBranch = false;
  @observable visibleDialogBranches = false;

  @action
  initTools() {
    const { currentProject = {} } = Projects;
    const cwd = currentProject.fullPath;
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
  async reset() {
    this.showMainPanel = false;
    this.currentStep = 0;
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
    try {
      return await this.gitTools.run('originRemote');
    } catch (error) {
      return false;
    }
  }

  @action
  async removeRemote() {
    try {
      return await this.gitTools.run('removeRemote', 'origin');
    } catch (error) {
      return false;
    }
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
  async add(files) {
    await this.gitTools.run('add', files || this.selectedFiles);
  }

  @action
  async commit(msg) {
    await this.gitTools.run('commit', msg || this.commitMsg);
  }

  @action
  async addAndCommit(files, msg) {
    try {
      this.gitCommitting = true;
      await this.add(files);
      await this.commit(msg);
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
  async lastCommit() {
    try {
      const lastCommit = this.gitTools.run('lastCommit', [this.currentBranch]);
      return lastCommit;
    } catch (error) {
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
