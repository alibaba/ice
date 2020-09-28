const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));


export default {
  state: {
    title: 'detail'
  },

  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  effects: (dispatch) => ({
    async updateDetailTitle(title: string) {
      await delay(1000);
      dispatch.default.update({
        title
      });
    },
  }),
};
