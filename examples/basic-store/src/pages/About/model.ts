export default {
  state: {
    title: ''
  },

  reducers: {
    update (prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  effects: () => ({
    async getPageTitle () {
      this.update({
        title: 'About Page'
      });
    },
  }),
};
