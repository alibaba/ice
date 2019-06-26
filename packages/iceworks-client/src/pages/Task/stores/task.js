import socket from '@src/socket';

export default {
  dataSource: {
    status: 'stop',
  },

  setStatus(status) {
    this.dataSource.status = status;
  },

  async start(type) {
    await socket.emit('adapter.task.start', { command: type });
  },

  async stop(type) {
    await socket.emit('adapter.task.stop', { command: type });
  },

  async getStatus(type) {
    const status = await socket.emit('adapter.task.getStatus', { command: type });
    this.dataSource.status = status;
  },

  async getConf(type) {
     const conf = await socket.emit('adapter.task.getConf', {
      command: type,
    });
    this.dataSource[type] = conf;
  },

  async setConf(type, params) {
    const result = await socket.emit('adapter.task.setConf', {
      command: type,
      options: params,
    });

    return result;
  },
};
