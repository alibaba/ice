import socket from '@src/socket';

export default {
  dataSource: {
    settings: [],
  },

  async start() {
    this.dataSource = { ...this.dataSource, ...await socket.emit('project.dev.start') };
  },

  async stop() {
    this.dataSource = { ...this.dataSource, ...await socket.emit('project.dev.stop') };
  },

  async getSettings() {
    this.dataSource.settings = await socket.emit('project.dev.settings');
  },
};
