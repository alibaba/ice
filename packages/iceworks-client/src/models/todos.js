// Initial State
const initialState = [];

// Constants
const CHANGE = 'iceworks/widgets/change';

// Action Creator
export function changeText(text) {
  return {
    type: CHANGE,
    payload: text,
  };
}

// Reducer
export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return state.concat([action.payload]);
    default:
      return state;
  }
}
