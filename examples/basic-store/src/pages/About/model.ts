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

  effects: (dispatch) => ({
    async getPageTitle () {
      dispatch.default.update({
        title: 'About Page'
      });
    },
  }),
};
