import socket from '@src/socket';

export default {
  dataSource: {
    cli: [],
  },

  async getCLIConf() {
    this.dataSource.cli = await socket.emit('project.configuration.getCLIConf');
  },
};
