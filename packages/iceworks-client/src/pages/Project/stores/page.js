export default {
  dataSource: {
    blocks: [],
    layout: {},
  },
  setData(dataSource) {
    this.dataSource = { ...this.dataSource, ...dataSource };
  },
};
