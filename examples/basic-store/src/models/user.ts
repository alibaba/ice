import { createModel } from 'ice';

export const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default createModel({
  state: {
    name: '',
    id: ''
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
    async getUserInfo() {
      await delay(1000);
      dispatch.user.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
});
