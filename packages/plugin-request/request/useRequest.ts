import { useReducer, useCallback, useRef } from 'react';
import { AxiosRequestConfig } from 'axios';
import customRequest from './request';

interface Result<D = any> {
  data: D;
  error: Error | undefined;
  loading: boolean;
  request: (...args: any[]) => any;
}

type Noop = (...args: any[]) => any;

/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config) or Promise
 * @return {object}
 *   @param {object} data - data in axios response
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {function} request - function to make the request manually
 */
function useRequest<D = any>(options: AxiosRequestConfig | Noop): Result<D> {
  const initialState = Object.assign(
    {
      data: null,
      error: null,
      loading: false,
    },
  );
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
   */
  const request = usePersistFn(async (config?: AxiosRequestConfig) => {
    try {
      dispatch({
        type: 'loading'
      });

      let response;
      if (typeof options === 'function') {
        response = await options(config);
      } else {
        response = await customRequest({
          ...options,
          ...config
        });
      }

      dispatch({
        type: 'success',
        data: response
      });
    } catch (error) {
      dispatch({
        type: 'error',
        error
      });
      throw error;
    }
  });

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
        error: null,
        loading: true,
      }
    case 'success':
      return {
        data: action.data,
        error: null,
        loading: false,
      }
    case 'error':
      return {
        data: null,
        error: action.error,
        loading: false,
      }
    default:
      throw new Error();
  }
}

function usePersistFn<T extends Noop>(fn: T) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call function while rendering.');
  });
  ref.current = fn;
  return useCallback(((...args) => ref.current(...args)) as T, [ref]);
}

export default useRequest;
