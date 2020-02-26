const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    count: 0
  },

  actions: {
    increment(prevState) {
      return { count: prevState.count + 1 }
    },

    async decrement(prevState) {
      await delay(10);
      return { count: prevState.count - 1 }
    },
  },
};
