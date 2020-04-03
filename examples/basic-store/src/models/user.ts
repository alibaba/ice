export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    name: '',
    id: ''
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
    async getUserInfo () {
      await delay(1000);
      this.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
};
