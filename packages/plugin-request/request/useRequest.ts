import { useReducer, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

interface Result<D = any> {
  response: AxiosResponse<D>;
  data: D;
  error: Error | undefined;
  loading: boolean;
  request: (config?: AxiosRequestConfig) => Promise<void>;
}

/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} data - data in axios response
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {string} status - status for request
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
function useRequest<D = any>(options: AxiosRequestConfig): Result<D> {
  const initialState = {
    response: null,
    data: null,
    loading: false,
    error: null,
    status: 'init',
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
   */
  const request = useCallback(async (config?: AxiosRequestConfig) => {
    try {
      dispatch({
        type: 'loading'
      });

      const response = await axiosInstance({
        ...options,
        ...config
      });

      dispatch({
        type: 'loaded',
        data: response.data,
        response,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'error',
        error
      });
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  return {
    ...state,
    request
  };
}

/**
 * Reducer to handle the status of the request
 * @param {object} state - original status
 * @param {object} action - action of dispatch
 * @return {object} new status
 */
function requestReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        data: null,
        response: null,
        error: null,
        loading: true,
      };
    case 'loaded':
      return {
        data: action.data,
        response: action.response,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        data: null,
        response: null,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error();
  }
}

export default useRequest;
