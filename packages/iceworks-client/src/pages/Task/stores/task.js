import socket from '@src/socket';

export default {
  dataSource: {},

  async start(type) {
    await socket.emit('project.task.start', { command: type });
  },

  async stop(type) {
    await socket.emit('project.task.stop', { command: type });
  },

  async setting(type) {
    this.dataSource[type] = await socket.emit('project.task.setting', {
      command: type,
    });
  },
};
