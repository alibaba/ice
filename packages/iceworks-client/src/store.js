import { createStore } from 'redux';
import { create } from 'redux-react-hook';

function todos(state = [], action) {
  switch (action.type) {
    case 'CHANGE':
      return state.concat([action.text]);
    default:
      return state;
  }
}

const INITIAL_STATE = ['Use Redux'];

export function makeStore() {
  return createStore(todos, INITIAL_STATE);
}

export const { StoreContext, useDispatch, useMappedState } = create();
