import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    path: '',
  },

  async refresh() {
    try {
      this.dataSource = await socket.emit('project.index.current');
    } catch (error) {
      // do something...
    }
  },

  async reset(path) {
    this.dataSource = await socket.emit('project.index.setCurrent', { path });
  },
};
