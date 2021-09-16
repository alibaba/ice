import { APP_MODE } from 'ice';

console.log('APP_MODE:', APP_MODE);

export const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    count: 0,
    countHistory: []
  },

  reducers: {
    increment(prevState) {
      prevState.count += 1;
      prevState.countHistory.push(prevState.count);
    },
    decrement(prevState) {
      prevState.count -= 1;
      prevState.countHistory.push(prevState.count);
    }
  },

  effects: (dispatch) => ({
    async decrementAsync() {
      await delay(10);
      dispatch.counter.decrement();
    },
  }),
};
