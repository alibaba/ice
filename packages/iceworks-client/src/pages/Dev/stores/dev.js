import socket from '@src/socket';

export default {
  dataSource: {
    settings: [],
  },

  async getDevSettings(projectFolderPath) {
    this.dataSource.settings = await socket.emit('project.dev.settings', {
      projectFolderPath,
    });
  },
};
