/*
 * registerReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
} from './constants';

// The initial state of the login
const initialState = {};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        registerResult: action.payload,
      });
    case USER_REGISTER_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

export default registerReducer;
