import socket from '@src/socket';

export default {
  dataSource: [],
  createPageName: '',
  async refresh() {
    this.dataSource = await socket.emit('adapter.page.getAll');
  },
  async delete(name) {
    await socket.emit('adapter.page.delete', { name });
  },
  async create(data) {
    this.createPageName = await socket.emit('adapter.page.create', data);
  },
  async addBlocks(data) {
    await socket.emit('adapter.page.addBlocks', data);
  },
};
