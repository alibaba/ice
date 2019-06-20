import socket from '@src/socket';

export default {
  dataSource: {
    cli: [],
  },

  async getCLIConf() {
    this.dataSource.cli = await socket.emit('adapter.configuration.getCLIConf');
  },

  async setCLIConf(params) {
    const result = await socket.emit('adapter.configuration.setCLIConf', {
      options: params,
    });

    return result;
  },
};
