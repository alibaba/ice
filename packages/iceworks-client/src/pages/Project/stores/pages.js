import socket from '@src/socket';

export default {
  dataSource: [],
  inited: false,
  async refresh(path) {
    if (this.inited) {
      return;
    }

    try {
      const dataSource = await socket.emit('project.page.list', {
        path,
      });
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },
};
