import socket from '@src/socket';

export default {
  dataSource: [],
  deletePaths: [],

  async refresh() {
    this.dataSource = await socket.emit('adapter.router.getAll');
  },
  async bulkCreate(args) {
    await socket.emit('adapter.router.bulkCreate', args);
  },
  async delete(args) {
    this.deletePaths = await socket.emit('adapter.router.delete', args);
  },
};
