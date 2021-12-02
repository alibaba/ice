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
  }
};
