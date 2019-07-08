import socket from '@src/socket';

const defaultDataSource = {
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
  directory: '',
};
export default {
  dataSource: defaultDataSource,
  async refresh() {
    this.dataSource = await socket.emit('adapter.oss.getConfig');
  },
  async setConfig(config) {
    this.dataSource = await socket.emit('adapter.oss.setConfig', config);
  },
  async clearConfig() {
    this.dataSource = await socket.emit('adapter.oss.setConfig', defaultDataSource);
  },
};
