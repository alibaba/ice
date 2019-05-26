
export default {
  dataSource: {
    show: false,
    percent: 0,
    statusText: '',
  },
  async show({ percent, statusText }) {
    this.dataSource.percent = percent || 5;
    this.dataSource.statusText = statusText;
    this.dataSource.show = true;
  },
  async hide() {
    this.dataSource.percent = 100;
    this.dataSource.show = false;
  },
};
