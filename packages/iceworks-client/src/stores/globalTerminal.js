export default {
  dataSource: {
    show: false,
    globalTerminalType: 'operation',
  },
  async show(globalTerminalType) {
    this.dataSource.show = true;
    this.dataSource.globalTerminalType = globalTerminalType;
  },
  async hide() {
    this.dataSource.show = false;
  },
  async trigger() {
    this.dataSource.show = !this.dataSource.show;
  },
};
