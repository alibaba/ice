import socket from '@src/socket';

export default {
  dataSource: {
    name: '',
    path: '',
    adapter: '',
    panels: [],
  },

  async refresh() {
    this.dataSource = await socket.emit('home.project.current');
  },

  async reset(path) {
    this.dataSource = await socket.emit('home.project.setCurrent', { path });
  },

  async setPanel(args) {
    this.dataSource.panels = await socket.emit('home.project.setPanel', args);
  },

  async sortPanels(args) {
    this.dataSource.panels = await socket.emit('home.project.sortPanels', args);
  },

  async loadAdapter() {
    this.dataSource.adapter = await socket.emit('home.project.loadAdapter');
  },
};
