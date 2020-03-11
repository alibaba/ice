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

  effects: {
    async getPageTitle (prevState, payload, actions) {
      actions.update({
        title: 'About Page'
      });
    },
  },
};
