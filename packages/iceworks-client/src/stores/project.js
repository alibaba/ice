import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    path: '',
    panels: [],
  },

  async refresh() {
    this.dataSource = await socket.emit('project.index.current');
  },

  async reset(path) {
    this.dataSource = await socket.emit('project.index.setCurrent', { path });
  },

  async openFolder(path) {
    await socket.emit('project.index.openFolder', { path });
  },

  async openEditor(path) {
    await socket.emit('project.index.openEditor', { path });
  },
};
