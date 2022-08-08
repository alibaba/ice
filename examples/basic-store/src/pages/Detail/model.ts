import { createModel } from 'ice';

const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default createModel({
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
});
