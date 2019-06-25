import socket from '@src/socket';

export default {
  dataSource: {},

  async start(type) {
    await socket.emit('adapter.task.start', { command: type });
  },

  async stop(type) {
    await socket.emit('adapter.task.stop', { command: type });
  },

  async queryStatus(type) {
    const status = await socket.emit('adapter.task.queryStatus', { command: type });
    this.dataSource.status = status;
  },

  async getConf(type) {
    this.dataSource[type] = await socket.emit('adapter.task.getConf', {
      command: type,
    });
  },

  async setConf(type, params) {
    const result = await socket.emit('adapter.task.setConf', {
      command: type,
      options: params,
    });

    return result;
  },
};
