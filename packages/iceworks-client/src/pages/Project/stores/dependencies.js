import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await socket.emit('project.dependency.list');
  },
};
