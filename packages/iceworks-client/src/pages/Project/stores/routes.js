import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await socket.emit('adapter.router.getAll');
  },
  async bulkCreate(args) {
    await socket.emit('adapter.router.bulkCreate', args);
  },
};
