import socket from '@src/socket';

export default {
  dataSource: {
    start: {},
    stop: [],
    settings: [],
  },

  async start() {
    this.dataSource.start = await socket.emit('project.dev.start');
  },

  async stop() {
    this.dataSource.stop = await socket.emit('project.dev.stop');
  },

  async getSettings() {
    this.dataSource.settings = await socket.emit('project.dev.settings');
  },
};
