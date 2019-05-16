import socket from '@src/socket';

export default {
  dataSource: {
    start: {},
    stop: [],
    settings: [],
  },

  async start(path) {
    this.dataSource.start = await socket.emit('project.dev.start', {
      path,
    });
  },

  async stop(path) {
    this.dataSource.stop = await socket.emit('project.dev.stop', {
      path,
    });
  },

  async getSettings(path) {
    this.dataSource.settings = await socket.emit('project.dev.settings', {
      path,
    });
  },
};
