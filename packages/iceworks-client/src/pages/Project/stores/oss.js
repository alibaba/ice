import socket from '@src/socket';

const originDataSource = {
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
  directory: '',
};
export default {
  dataSource: originDataSource,
  async refresh() {
    this.dataSource = await socket.emit('project.oss.config');
  },
  async setConfig(config) {
    this.dataSource = await socket.emit('project.oss.setConfig', config);
  },
  async clearConfig() {
    this.dataSource = await socket.emit('project.oss.setConfig', originDataSource);
  },
};
