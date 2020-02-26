export default {
  state: {
    dataSource: {}
  },

  actions: {
    async getUserInfo(prevState) {
      const dataSource = { userName: 'taobao', age: 21 };
      return {
        ...prevState,
        dataSource,
      }
    },
  }
};
