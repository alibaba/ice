import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh(projectFolderPath) {
    try {
      const dataSource = await socket.emit('project.page.list', {
        projectFolderPath,
      });
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },
};
