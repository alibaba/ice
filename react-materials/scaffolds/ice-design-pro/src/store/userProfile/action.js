/*
 *
 * profile actions
 *
 */

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './constants';
import { getUserProfile } from '../../api/user';

const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST,
    isLoading: true,
  };
};

const userProfileSuccess = (payload) => {
  return {
    type: USER_PROFILE_FAILURE,
    isLoading: false,
    payload,
  };
};

const userProfileFailure = (payload) => {
  return {
    type: USER_PROFILE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const userProfile = (params) => {
  return async (dispatch) => {
    dispatch(userProfileRequest());
    try {
      const response = await getUserProfile(params);

      dispatch(userProfileSuccess(response.data));
    } catch (error) {
      dispatch(userProfileFailure(error));
    }
  };
};
