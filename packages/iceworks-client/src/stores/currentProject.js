import socket from '@src/socket';

export default {
  dataSource: {
    id: '0',
    name: '',
    pages: [
    ],
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
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { pages } = this.dataSource;
    this.pages = [].concat(pages).concat([{ ...page, id: pages.length }]);
  },
  async reset(folderPath) {
    try {
      const dataSource = await socket.emit('project.index.setCurrent', { folderPath });
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },
  async devStart() {
    const dataSource = await socket.emit(
      'project.index.devStart',
      { projectFolderPath: this.dataSource.folderPath },
    );
    this.dataSource = dataSource;
  },
  async devStop() {
    const dataSource = await socket.emit(
      'project.index.devStop',
      { projectFolderPath: this.dataSource.folderPath },
    );
    this.dataSource = dataSource;
  },
};
