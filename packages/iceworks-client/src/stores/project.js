import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    path: '',
  },

  inited: false,

  async refresh() {
    if (this.inited) {
      return;
    }

    try {
      this.dataSource = (await socket.emit('project.index.current')) || {};
      this.inited = true;
    } catch (error) {
      // do something...
    }
  },

  async reset(path) {
    this.dataSource = await socket.emit('project.index.setCurrent', {
      path,
    });
  },
};
