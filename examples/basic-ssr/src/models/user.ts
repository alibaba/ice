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

  effects: {
    async getUserInfo (prevState, payload, actions) {
      await delay(1000);
      actions.update({
        name: 'taobao',
        id: '123',
      });
    },
  },
};
