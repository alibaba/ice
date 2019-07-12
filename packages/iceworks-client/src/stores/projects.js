import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await socket.emit('home.project.list');
  },
  async add(projectPath) {
    await socket.emit('home.project.add', { projectPath });
  },
  async delete(params) {
    await socket.emit('home.project.delete', params);
  },
  async create(params) {
    await socket.emit('home.project.create', params);
  },
};
