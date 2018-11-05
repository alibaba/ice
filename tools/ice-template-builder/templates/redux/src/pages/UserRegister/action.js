/*
 * Login Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { push } from 'react-router-redux';
import { Feedback } from '@icedesign/base';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from './constants';
import { postUserRegister } from '../../api';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const userRegisterRequest = () => {
  return {
    type: USER_REGISTER_REQUEST,
    isLoading: true,
  };
};

const userRegisterSuccess = (payload) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload,
    isLoading: false,
  };
};

const userRegisterFailure = (payload) => {
  return {
    type: USER_REGISTER_FAILURE,
    payload,
    isLoading: false,
  };
};

export const userRegister = (params) => {
  return async (dispatch) => {
    dispatch(userRegisterRequest());
    try {
      const response = await postUserRegister(params);

      if (response.data.status === 200) {
        Feedback.toast.success('注册成功');

        dispatch(userRegisterSuccess(response.data));

        dispatch(push('/user/login'));
      } else {
        Feedback.toast.error('注册失败');
      }

      return response.data;
    } catch (error) {
      dispatch(userRegisterFailure(error));
    }
  };
};
