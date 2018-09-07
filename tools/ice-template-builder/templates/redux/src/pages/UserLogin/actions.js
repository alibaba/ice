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
import { login } from '../../api';

<% if (redux.enabled && redux.authorityModule) { %>
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
<% } %>

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
    isLoading: true,
  };
};

const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
    isLoading: false,
  };
};

const userLoginFailure = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload,
    isLoading: false,
  };
};

export const userLogin = (params) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      const response = await login(params);

      dispatch(userLoginSuccess(response.data));

      if (response.data.status === 200) {
        <% if (redux.enabled && redux.authorityModule) { %>
        setAuthority(response.data.currentAuthority);

        reloadAuthorized();
        <% } %>

        dispatch(push('/'));
      } else {
        Feedback.toast.error('账号或者密码错误');
      }

      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};
