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

  effects: {
    async decrementAsync (state, payload, actions) {
      await delay(10);
      actions.decrement();
    },
  }
};
