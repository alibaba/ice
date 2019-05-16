import socket from '@src/socket';

export default {
  dataSource: [],
  inited: false,
  async refresh() {
    if (this.inited) {
      return;
    }

    try {
      const dataSource = await socket.emit('project.dependency.list');
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },
};
