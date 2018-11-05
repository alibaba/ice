/*
 *
 * userProfile reducer
 *
 */

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './constants';

// The initial state
const initialState = {};

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_PROFILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

export default userProfileReducer;
