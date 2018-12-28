import gitPromie from 'simple-git/promise';
import { Feedback, Dialog } from '@icedesign/base';
import { debug } from 'util';

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

  catchErrWrap = async (fnName, errMsg, ...opts) => {
    opts = opts[0] === undefined ? null : opts;
    try {
      if (opts !== null) {
        return await this.git()[fnName](...opts);
      } else {
        return await this.git()[fnName]();
      }
    } catch (error) {
      this.showError(error, errMsg);
      throw error;
    }
  }

  git = () => {
    return gitPromie(this.cwd);
  }

  // 获取远程仓库
  gitOriginRemote = async () => {
    const errMsg = 'git getRemotes 失败';
    let remotes = await this.catchErrWrap('getRemotes', errMsg, true);
    remotes = remotes.filter(({ name }) => name == 'origin');
    return remotes;
  }

  // 获取所有分支
  gitBranches = async () => {
    const errMsg = 'git branchLocal 失败';
    return await this.catchErrWrap('branchLocal', errMsg);
  };

  // 获取当前分支文件状态
  gitStatus = async () => {
    const errMsg = 'git status 失败';
    return await this.catchErrWrap('status', errMsg);
  };

  // 获取最新的 Commit 信息
  gitLastCommit = async (opts) => {
    const errMsg = 'git lastCommit 失败';
    return await this.catchErrWrap('log', errMsg, opts);
  };

  gitCheckIsRepo = async () => {
    const errMsg = '仓库地址错误';
    return await this.catchErrWrap('checkIsRepo', errMsg);
  }
  
  gitAdd = async (opts) => {
    const errMsg = 'git add 失败请重试';
    return await this.catchErrWrap('add', errMsg, opts);
  }

  gitCommit = async (commitMsg) => {
    const errMsg = 'git commit 失败请重试';
    return await this.catchErrWrap('commit', errMsg, commitMsg);
  }

  gitPush = async (remote = 'origin', currentBranch) => {
    const errMsg = 'git push 失败请重试';
    return await this.catchErrWrap('push', errMsg, remote, currentBranch);
  }

  gitInit = async () => {
    const errMsg = 'git init 失败请重试';
    return await this.catchErrWrap('init', errMsg);
  }

  gitRemoveRemote = async (name = 'origin') => {
    const errMsg = 'git remote remove 失败请重试';
    return await this.catchErrWrap('removeRemote', errMsg, name);
  }

  gitAddRemote = async (name = 'origin', url) => {
    const errMsg = 'git remote add 失败请重试';
    return await this.catchErrWrap('addRemote', errMsg, name, url);
  }

  gitFetch = async () => {
    const errMsg = 'git fetch 失败请重试';
    return await this.catchErrWrap('fetch', errMsg);
  }

  gitBranch = async (opts) => {
    const errMsg = 'git branch 失败请重试';
    return await this.catchErrWrap('branch', errMsg, opts);
  }
  
  gitCheckout = async (checkoutBranch) => {
    const errMsg = 'git checkout 失败请重试';
    return await this.catchErrWrap('checkout', errMsg, checkoutBranch);
  }

  gitCheckoutBranch = async (checkoutBranch, branchOrigin) => {
    const errMsg = 'git checkout -b 失败请重试';
    return await this.catchErrWrap('checkout', errMsg, checkoutBranch, branchOrigin);
  }

  gitcheckoutLocalBranch = async (newBranch) => {
    const errMsg = 'git checkout -b 失败请重试';
    return await this.catchErrWrap('checkoutLocalBranch', errMsg, newBranch);
  }
}

export default GitTools