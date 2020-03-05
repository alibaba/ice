export default {
  state: {
    title: ''
  },

  reducers: {
    update: (prevState, payload) => {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  effects: {
    getPageTitle: async (prevState, payload, actions) => {
      actions.update({
        title: 'About Page'
      });
    },
  },
};
