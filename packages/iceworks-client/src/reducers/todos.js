function todosReducer(state = [], action) {
  switch (action.type) {
    case 'CHANGE':
      return state.concat([action.text]);
    default:
      return state;
  }
}

export default todosReducer;
