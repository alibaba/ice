import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    folderPath: '',
    domain: '',
    devStatus: 'normal',
  },

  inited: false,

  async refresh() {
    if (this.inited) {
      return;
    }

    try {
      const dataSource = await socket.emit('project.index.current');
      this.dataSource = dataSource;
      this.inited = true;
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
