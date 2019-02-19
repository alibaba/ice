import gitPromie from 'simple-git/promise';
import { Feedback, Dialog } from '@icedesign/base';
import { debug } from 'util';

/**
 * 命令文档：https://web.npm.alibaba-inc.com/package/simple-git
 */
const gitToolsMap = {
  originRemote: {  // 获取远程仓库
    name: 'getRemotes',
    errMsg: 'git getRemotes 失败',
    handleFunc: (result) => {
      return result.filter(({ name }) => name == 'origin');
    }
  },
  branches: { // 获取所有分支
    name: 'branchLocal',
    errMsg: 'git branchLocal 失败'
  },
  status: { // 获取当前分支文件状态
    name: 'status',
    errMsg: 'git status 失败'
  },
  lastCommit: { // 获取最新的 Commit 信息
    name: 'log',
    errMsg: 'git lastCommit 失败'
  },
  checkIsRepo: { // 检查当前输入的是否是一个repo地址
    name: 'checkIsRepo',
    errMsg: '仓库地址错误'
  },
  add: { // git add
    name: 'add',
    errMsg: 'git add 失败请重试'
  },
  commit: { // git commit
    name: 'commit',
    errMsg: 'git commit 失败请重试'
  },
  push: { // git push
    name: 'push',
    errMsg: 'git push 失败请重试'
  },
  pull: { // git pull
    name: 'pull',
    errMsg: 'git pull 失败请重试',
  },
  init: { // git init
    name: 'init',
    errMsg: 'git int 失败请重试'
  },
  removeRemote: { // 移除当前remote
    name: 'removeRemote',
    errMsg: 'git remote remove 失败请重试'
  },
  addRemote: { // 添加当前remote
    name: 'addRemote',
    errMsg: 'git remote add 失败请重试'
  },
  fetch: { // git fetch
    name: 'fetch',
    errMsg: 'git fetch 失败请重试'
  },
  branch: { // git branch
    name: 'branch',
    errMsg: 'git branch 失败请重试'
  },
  checkout: { // git checkout 参数： checkoutBranch
    name: 'checkout',
    errMsg: 'git checkout 失败请重试'
  },
  checkoutBranch: { // git checkout 参数：checkoutBranch, branchOrigin
    name: 'checkoutBranch',
    errMsg: 'git checkout -b 失败请重试'
  },
  checkoutLocalBranch: { // 切新分支 参数：newBranch
    name: 'checkoutLocalBranch',
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
    const {name, errMsg, handleFunc} = gitToolsMap[toolName];
    try {
      let result;
      if (opts[0] !== undefined) {
        result = await this.git()[name](...opts);
        console.log('result', result)
      } else {
        result = await this.git()[name]();
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