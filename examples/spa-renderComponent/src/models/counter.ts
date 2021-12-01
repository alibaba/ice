export default {
  state: {
    count: 0,
  },

  reducers: {
    increment(prevState) {
      prevState.count += 1;
    },
    decrement(prevState) {
      prevState.count -= 1;
    }
  }
};
