import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    path: '',
    panels: [],
  },

  async refresh() {
    this.dataSource = await socket.emit('home.project.current');
  },

  async reset(path) {
    this.dataSource = await socket.emit('home.project.setCurrent', { path });
  },
};
