import { APP_MODE } from 'ice';

console.log('APP_MODE:', APP_MODE);

export const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    count: 0
  },

  reducers: {
    increment(prevState) {
      return { count: prevState.count + 1 };
    },
    decrement(prevState) {
      return { count: prevState.count - 1 };
    }
  },

  effects: (dispatch) => ({
    async decrementAsync() {
      await delay(10);
      dispatch.counter.decrement();
    },
  }),
};
