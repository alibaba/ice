import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await socket.emit('project.page.list');
  },
  async delete(name) {
    await socket.emit('project.page.delete', { name });
  },
  async create(data) {
    await socket.emit('project.page.create', data);
  },
};
