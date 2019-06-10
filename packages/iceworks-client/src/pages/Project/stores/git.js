import socket from '@src/socket';

const defaultDataSource = {
  isRepository: false,
  remoteUrl: '',
  currentBranch: '',
  localBranches: [],
  originBranches: [],
  unstagedFiles: [],
};

export default {
  dataSource: defaultDataSource,

  // TODO Unified handling of errors
  async refresh() {
    try {
      this.dataSource = await socket.emit('project.git.status');
    } catch (error) {
      this.dataSource = defaultDataSource;
    }
  },

  async init(remoteUrl) {
    await socket.emit('project.git.init', { remoteUrl });
  },

  async setRemote(remoteUrl) {
    await socket.emit('project.git.setRemote', { remoteUrl });
  },

  async checkoutLocalBranch(name) {
    await socket.emit('project.git.checkoutLocalBranch', { name });
  },

  async switchBranch(data) {
    await socket.emit('project.git.switchBranch', data);
  },

  async getBranches() {
    const { localBranches, originBranches } = await socket.emit('project.git.branches');
    this.dataSource.localBranches = localBranches;
    this.dataSource.originBranches = originBranches;
  },

  async pull() {
    await socket.emit('project.git.pull', this.dataSource.currentBranch);
  },

  async push() {
    await socket.emit('project.git.push', this.dataSource.currentBranch);
  },

  async addAndCommit(data) {
    await socket.emit('project.git.addAndCommit', data);
  },
};
