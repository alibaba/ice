import gitPromie from 'simple-git/promise';
import { Feedback, Dialog } from '@icedesign/base';

class GitTools {
  constructor(cwd) {
    this.cwd = cwd;
  }

  showError = (error, msg) => {
    Dialog.alert({
      title: '提示',
      content: (
        <div style={{ width: 400 }}>
          {(error && error.message) || msg}
        </div>
      ),
    });
  }

  git = () => {
    return gitPromie(this.cwd);
  }

  // 获取远程仓库
  gitOriginRemote = async () => {

    let remotes;
    try {
      remotes = await this.git().getRemotes(true);
      remotes = remotes.filter(({ name }) => name == 'origin');
    } catch (error) {
      this.showError(error, 'git getRemotes 失败');
      throw error;
    }

    return remotes;
  }

  // 获取所有分支
  gitBranches = async () => {
    let branches;
    try {
      branches = await this.git().branchLocal();
    } catch (error) {
      this.showError(error, 'git branchLocal 失败');
      throw error;
    }

    return branches;
  };

  // 获取当前分支文件状态
  gitStatus = async () => {
    let status;
    try {
      status = await this.git().status();
    } catch (error) {
      this.showError(error, 'git status 失败');
      throw error;
    }

    return status;
  };

  // 获取最新的 Commit 信息
  gitLastCommit = async (opts) => {
    let lastCommit;
    try {
      lastCommit = await this.git().log(opts);
    } catch (error) {
      this.showError(error, 'git lastCommit 失败');
      throw error;
    }

    return lastCommit;
  };

  gitCheckIsRepo = async () => {

    let isRepo;
    try {
      isRepo = await this.git().checkIsRepo();
    } catch (error) {
      console.error('gitCheckIsRepo', error);
      throw error;
    }

    return isRepo;
  }
  
  gitAdd = async (opts) => {
    let add;
    try {
      add = await this.git().add(opts);
    } catch (error) {
      this.showError(error, 'git add 失败请重试');
      throw error;
    } 

    return add;
  }

  gitCommit = async (commitMsg) => {
    let commit;
    try {
      commit = await this.git().commit(commitMsg);
    } catch (error) {
      this.showError(error, 'commit 失败请重试');
      throw error;
    }

    return commit;
  }

  gitPush = async (remote = 'origin', currentBranch) => {
    let push;
    try {
      push = await this.git().push(remote, currentBranch);
    } catch (error) {
      this.showError(error, 'git push 失败请重试');
      throw error;
    }

    return push;
  }

  gitInit = async () => {
    let init;
    try {
      init = await this.git().init();
    } catch (error) {
      this.showError(error, 'git init 失败请重试');
      throw error;
    }

    return init;
  }

  gitRemoveRemote = async (name = 'origin') => {
    let removeRemote;
    try {
      removeRemote = await this.git().removeRemote(name);
    } catch (error) {
      this.showError(error, 'git remote remove 失败请重试');
      throw error;
    }

    return removeRemote;
  }

  gitAddRemote = async (name = 'origin', url) => {
    let addRemote;
    try {
      addRemote = await this.git().addRemote(name, url);
    } catch (error) {
      this.showError(error, 'git remote add 失败请重试');
      throw error;
    }

    return addRemote;
  }

  gitFetch = async () => {
    let fetch;
    try {
      fetch = await this.git().fetch();
    } catch (error) {
      this.showError(error, 'git fetch 失败请重试');
      throw error;
    }

    return fetch;
  }

  gitBranch = async (opts) => {
    let branch;
    try {
      branch = await this.git().branch(opts);
    } catch (error) {
      this.showError(error, 'git branch 失败请重试');
      throw error;
    }

    return branch;
  }
  
  gitCheckout = async (checkoutBranch) => {
    let checkout;
    try {
      checkout = await this.git().checkout(checkoutBranch);
    } catch (error) {
      this.showError(error, 'git checkout 失败请重试');
      throw error;
    }

    return checkout;
  }

  gitCheckoutBranch = async (checkoutBranch, branchOrigin) => {
    let checkoutB;
    try {
      checkoutB = await this.git().checkout(checkoutBranch, branchOrigin);
    } catch (error) {
      this.showError(error, 'git checkout -b 失败请重试');
      throw error;
    }

    return checkoutB;
  }

  gitcheckoutLocalBranch = async (newBranch) => {
    let checkoutLocalBranch;
    try {
      checkoutLocalBranch = await this.git().checkoutLocalBranch(newBranch);
    } catch (error) {
      this.showError(error, 'git checkout -b 失败请重试');
      throw error;
    }

    return checkoutLocalBranch;
  }
}

export default GitTools