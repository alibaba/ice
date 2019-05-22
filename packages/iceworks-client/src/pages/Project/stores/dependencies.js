import socket from '@src/socket';

export default {
  dataSource: {
    dependencies: [],
    devDependencies: [],
    status: '',
  },
  async refresh() {
    this.dataSource = await socket.emit('project.dependency.list');
  },
  async setStatus(status) {
    this.dataSource.status = status;
  },
  async reset() {
    await socket.emit('project.dependency.reset');
  },
  async create(value) {

  },
};
