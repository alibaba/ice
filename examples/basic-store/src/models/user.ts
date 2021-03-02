import { IRootDispatch } from 'ice';

export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(1), time));

export default {
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

  effects: (dispatch: IRootDispatch) => ({
    async getUserInfo() {
      await delay(1000);
      dispatch.user.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
};
