import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await socket.emit('project.router.list');
  },
  async setData(args) {
    await socket.emit('project.router.setData', args);
  },
};
