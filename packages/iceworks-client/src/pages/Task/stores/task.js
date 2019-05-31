import socket from '@src/socket';

export default {
  dataSource: {},

  async start(type) {
    await socket.emit('project.task.start', { command: type });
  },

  async stop(type) {
    await socket.emit('project.task.stop', { command: type });
  },

  async getSetting(type) {
    this.dataSource[type] = await socket.emit('project.task.getSetting', {
      command: type,
    });
  },
};
