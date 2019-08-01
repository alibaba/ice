import socket from '@src/socket';

const defaultDataSource = {
  isRepository: false,
  remoteUrl: '',
  currentBranch: '',
  localBranches: [],
  originBranches: [],
  unstageFiles: [],
};

export default {
  dataSource: defaultDataSource,

  // TODO Unified handling of errors
  async refresh() {
    try {
      this.dataSource = await socket.emit('adapter.git.getStatus');
    } catch (error) {
      this.dataSource = defaultDataSource;
    }
  },

  async init(remoteUrl) {
    await socket.emit('adapter.git.init', { remoteUrl });
  },

  async setRemote(remoteUrl) {
    await socket.emit('adapter.git.setRemote', { remoteUrl });
  },

  async checkoutLocalBranch(name) {
    await socket.emit('adapter.git.checkoutLocalBranch', { name });
  },

  async switchBranch(data) {
    await socket.emit('adapter.git.switchBranch', data);
  },

  async getBranches() {
    const { localBranches, originBranches } = await socket.emit('adapter.git.getBranches');
    this.dataSource.localBranches = localBranches;
    this.dataSource.originBranches = originBranches;
  },

  async pull() {
    await socket.emit('adapter.git.pull', { branch: this.dataSource.currentBranch });
  },

  async push() {
    await socket.emit('adapter.git.push', { branch: this.dataSource.currentBranch });
  },

  async addAndCommit(data) {
    await socket.emit('adapter.git.addAndCommit', data);
  },
};
