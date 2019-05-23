import socket from '@src/socket';

export default {
  dataSource: {
    status: '',
    setting: [],
  },

  async start() {
    this.dataSource = {
      ...this.dataSource,
      ...(await socket.emit('project.task.start')),
    };
  },

  async stop() {
    this.dataSource = {
      ...this.dataSource,
      ...(await socket.emit('project.task.stop')),
    };
  },

  async setting() {
    this.dataSource.setting = await socket.emit('project.task.setting');
  },
};
