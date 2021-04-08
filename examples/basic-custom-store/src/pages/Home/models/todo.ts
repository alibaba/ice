export default {
  state: {
    todos: [],
  },
  reducers: {
    add(prevState, payload) {
      prevState.todos.push(payload);
    }
  }
};
