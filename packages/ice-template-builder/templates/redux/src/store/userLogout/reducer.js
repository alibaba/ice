/*
 *
 * userLogout reducer
 *
 */

import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_SUCCESS,
} from './constants';

// The initial state
const initialState = {};

function logoutReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case USER_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

export default logoutReducer;
