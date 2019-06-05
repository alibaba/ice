import socket from '@src/socket';

export default {
  dataSource: {},

  async start(type) {
    await socket.emit('project.task.start', { command: type });
  },

  async stop(type) {
    await socket.emit('project.task.stop', { command: type });
  },

  async getConf(type) {
    this.dataSource[type] = await socket.emit('project.task.getConf', {
      command: type,
    });
  },

  async setConf(type, params) {
    const result = await socket.emit('project.task.setConf', {
      command: type,
      options: params,
    });

    return result;
  },
};
