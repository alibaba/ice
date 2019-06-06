import socket from '@src/socket';
// import logger from '@utils/logger';

export default {
  dataSource: {
    isRepository: false,
    remoteUrl: '',
  },

  async refresh() {
    this.dataSource = await socket.emit('project.git.status');
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
};
