import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    folderPath: '',
    domain: '',
    devStatus: 'normal',
  },

  async refresh() {
    try {
      const dataSource = await socket.emit('project.index.current');
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },

  async reset(folderPath) {
    this.dataSource = await socket.emit('project.index.setCurrent', {
      folderPath,
    });
  },

  async devStart() {
    this.dataSource = await socket.emit('project.index.devStart', {
      projectFolderPath: this.dataSource.folderPath,
    });
  },

  async devStop() {
    this.dataSource = await socket.emit('project.index.devStop', {
      projectFolderPath: this.dataSource.folderPath,
    });
  },
};
