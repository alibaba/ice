export default {
  state: {
    done: true
  },

  reducers: {
    update(prevState) {
      return { done: !prevState.done };
    },
  },
};
