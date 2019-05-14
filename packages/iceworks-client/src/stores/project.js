import socket from '@src/socket';

export default {
  dataSource: {
    projectInfo: {
      projectName: '',
      projectPath: '',
    },
  },

  inited: false,

  async refresh() {
    if (this.inited) {
      return;
    }

    try {
      const projectInfo = await socket.emit('project.index.current');
      this.dataSource.projectInfo = projectInfo || {};
      this.inited = true;
    } catch (error) {
      // do something...
    }
  },

  async reset(projectPath) {
    this.dataSource = await socket.emit('project.index.setCurrent', {
      projectPath,
    });
  },
};
