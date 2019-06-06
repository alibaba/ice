import socket from '@src/socket';
// import logger from '@utils/logger';

export default {
  dataSource: {
    isRepository: false,
  },

  async refresh() {
    this.dataSource = await socket.emit('project.git.status');
  },

  async init(remoteUrl) {
    await socket.emit('project.git.init', { remoteUrl });
  },
};
