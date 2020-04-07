import { IRootDispatch } from 'ice';

export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    count: 0
  },

  reducers: {
    increment (prevState) {
      return { count: prevState.count + 1 };
    },
    decrement (prevState) {
      return { count: prevState.count - 1 };
    }
  },

  effects: (dispatch: IRootDispatch) => ({
    async decrementAsync () {
      // dispatch.user.getUserInfo();
      dispatch.user.getUserInfo();
      await delay(10);
      this.decrement();
    },
  }),
};
