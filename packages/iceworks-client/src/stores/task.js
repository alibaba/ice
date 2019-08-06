import socket from '@src/socket';

export default {
  dataSource: {},

  async refresh() {
    const result = await socket.emit('adapter.task.getStatus');
    if (result && result.status) {
      const { dev: devStatus, buildStatus } = result.status;
      this.dataSource.dev = { status: devStatus } ;
      this.dataSource.build = { status: buildStatus };
    }
  },

  setStatus(type, status) {
    if (!this.dataSource[type]) {
      this.dataSource[type] = {};
    }
    this.dataSource[type].status = status;
  },

  async start(type) {
    const { installed } = await socket.emit('adapter.task.start', { command: type });
    this.dataSource.installed = installed;
  },

  async stop(type) {
    await socket.emit('adapter.task.stop', { command: type });
  },

  async getStatus(type) {
    const status = await socket.emit('adapter.task.getStatus', {
      command: type,
    });
    if (!this.dataSource[type]) {
      this.dataSource[type] = {};
    }
    this.dataSource[type].status = status;
  },

  async getConf(type) {
    const conf = await socket.emit('adapter.task.getConf', {
      command: type,
    });
    if (!this.dataSource[type]) {
      this.dataSource[type] = {};
    }
    this.dataSource[type].conf = conf;
  },

  async setConf(type, params) {
    const result = await socket.emit('adapter.task.setConf', {
      command: type,
      options: params,
    });

    return result;
  },
};
