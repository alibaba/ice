import socket from '@src/socket';

export default {
  dataSource: {
    settings: [],
  },

  async getSettings() {
    this.dataSource.settings = await socket.emit('project.configuration.settings');
  },
};
