import socket from '@src/socket';

export default {
  dataSource: {
    dependencies: [],
    devDependencies: [],
  },
  async refresh() {
    this.dataSource = await socket.emit('project.dependency.list');
  },
};
