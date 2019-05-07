import socket from '@src/socket';

export default {
  dataSource: {
    pages: [],
    devSettings: [],
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

  async addPage(page) {
    const { pages } = this.dataSource;
    this.dataSource.pages = []
      .concat(pages)
      .concat([{ ...page, id: pages.length }]);
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

  async devSettings() {
    this.dataSource.devSettings = await socket.emit('project.dev.settings');
  },
};
