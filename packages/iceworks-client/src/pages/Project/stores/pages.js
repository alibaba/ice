import socket from '@src/socket';

export default {
  dataSource: [],
  inited: false,
  async refresh(projectPath) {
    if (this.inited) {
      return;
    }

    try {
      const dataSource = await socket.emit('project.page.list', {
        projectPath,
      });
      this.dataSource = dataSource;
      this.inited = true;
    } catch (error) {
      // do something...
    }
  },
};
