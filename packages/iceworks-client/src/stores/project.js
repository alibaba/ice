import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    path: '',
  },

  async refresh() {
    try {
      const dataSource = await socket.emit('project.index.current');
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },

  async reset() {
    this.dataSource = await socket.emit('project.index.setCurrent');
  },
};
