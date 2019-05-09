import socket from '@src/socket';

export default {
  dataSource: {
    start: {},
    stop: [],
    settings: [],
  },

  async start(projectPath) {
    this.dataSource.start = await socket.emit('project.dev.start', {
      projectPath,
    });
  },

  async stop(projectPath) {
    this.dataSource = await socket.emit('project.dev.stop', {
      projectPath,
    });
  },

  async getSettings(projectPath) {
    this.dataSource.settings = await socket.emit('project.dev.settings', {
      projectPath,
    });
  },
};
