import socket from '@src/socket';

export default {
  dataSource: {
    settings: [],
  },

  async getConfigurationSettings() {
    this.dataSource.settings = await socket.emit(
      'project.configuration.settings'
    );
  },
};
