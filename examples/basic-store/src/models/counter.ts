import { APP_MODE, createModel } from 'ice';

console.log('APP_MODE:', APP_MODE);

export const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default createModel({
  state: {
    count: 0,
    countHistory: [] as number[]
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
});
