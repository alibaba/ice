import gitPromie from 'simple-git/promise';
import { Feedback, Dialog } from '@icedesign/base';
import { debug } from 'util';

const gitToolsMap = {
  gitOriginRemote: {  // 获取远程仓库
    func: 'getRemotes',
    errMsg: 'git getRemotes 失败',
    handleFunc: (result) => {
      return result.filter(({ name }) => name == 'origin');
    }
  },
  gitBranches: { // 获取所有分支
    func: 'branchLocal',
    errMsg: 'git branchLocal 失败'
  },
  gitStatus: { // 获取当前分支文件状态
    func: 'status',
    errMsg: 'git status 失败'
  },
  gitLastCommit: { // 获取最新的 Commit 信息
    func: 'log',
    errMsg: 'git lastCommit 失败'
  },
  gitCheckIsRepo: { // 检查当前输入的是否是一个repo地址
    func: 'checkIsRepo',
    errMsg: '仓库地址错误'
  },
  gitAdd: { // git add
    func: 'add',
    errMsg: 'git add 失败请重试'
  },
  gitCommit: { // git commit
    func: 'commit',
    errMsg: 'git commit 失败请重试'
  },
  gitPush: { // git push
    func: 'push',
    errMsg: 'git push 失败请重试'
  },
  gitInit: { // git init
    func: 'init',
    errMsg: 'git int 失败请重试'
  },
  gitRemoveRemote: { // 移除当前remote
    func: 'removeRemote',
    errMsg: 'git remote remove 失败请重试'
  },
  gitAddRemote: { // 添加当前remote
    func: 'addRemote',
    errMsg: 'git remote add 失败请重试'
  },
  gitFetch: { // git fetch
    func: 'fetch',
    errMsg: 'git fetch 失败请重试'
  },
  gitBranch: { // git branch
    func: 'branch',
    errMsg: 'git branch 失败请重试'
  },
  gitCheckout: { // git checkout 参数： checkoutBranch
    func: 'checkout',
    errMsg: 'git checkout 失败请重试'
  },
  gitCheckoutBranch: { // git checkout 参数：checkoutBranch, branchOrigin
    func: 'checkout',
    errMsg: 'git checkout -b 失败请重试'
  },
  gitcheckoutLocalBranch: { // 切新分支 参数：newBranch
    func: 'checkoutLocalBranch',
    errMsg: 'git checkoutLocalBranch 失败请重试'
  }
}

class GitTools {
  constructor(cwd) {
    this.cwd = cwd;
  }

  git = () => {
    return gitPromie(this.cwd);
  }

  run = async (toolName, ...opts) => {
    const {func, errMsg, handleFunc} = gitToolsMap[toolName];
    try {
      let result;
      if (opts[0] !== undefined) {
        result = await this.git()[func](...opts);
      } else {
        result = await this.git()[func]();
      }
      if (typeof handleFunc === 'function') {
        return handleFunc(result);
      }
      return result;
    } catch (error) {
      this.showError(error, errMsg);
      throw error;
    }
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

}

export default GitTools