
export default {
  dataSource: {
    show: false,
  },
  async show() {
    this.dataSource.show = true;
  },
  async hide() {
    this.dataSource.show = false;
  },
  async trigger() {
    this.dataSource.show = !this.dataSource.show;
  },
};
