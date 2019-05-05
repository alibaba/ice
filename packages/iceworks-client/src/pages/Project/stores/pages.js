import socket from '@src/socket';

export default {
  dataSource: [],
  inited: false,
  async refresh(projectFolderPath) {
    if (this.inited) {
      return;
    }

    try {
      const dataSource = await socket.emit('page.list', { projectFolderPath });
      this.dataSource = dataSource;
      this.inited = true;
    } catch (error) {
      // do something...
    }
  },
};
