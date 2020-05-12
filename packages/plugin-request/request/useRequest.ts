import { useReducer, useCallback, useRef } from 'react';
import { AxiosRequestConfig } from 'axios';
import customRequest from './request';

interface IResult<D = any> {
  data: D;
  error: Error | undefined;
  loading: boolean;
}

type IOptionFn = (...args: any[]) => any;
type IOptionType = IOptionFn | AxiosRequestConfig;

interface IServiceResult<T extends IOptionFn> extends IResult {
  request: (...args: Parameters<T>) => void;
}

interface IOptionResult extends IResult {
  request: (args?: AxiosRequestConfig) => void;
}

type IUseRequest = <T extends IOptionType>(options: T) => T extends IOptionFn
  ? IServiceResult<T>
  : IOptionResult;

/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config) or Promise
 * @return {object}
 *   @param {object} data - data in axios response
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
const useRequest = function (options) {
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
  const request = usePersistFn(async (args) => {
    try {
      dispatch({
        type: 'loading'
      });

      let data;
      if (typeof options === 'function') {
        // @ts-ignore
        data = await options(args);
      } else {
        data = await customRequest({
          ...options,
          ...args
        });
      }

      dispatch({
        type: 'success',
        data
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
} as IUseRequest;

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

function usePersistFn<T extends IOptionFn>(fn: T) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call function while rendering.');
  });
  ref.current = fn;
  return useCallback(((...args) => ref.current(...args)) as T, [ref]);
}

// const requestCallback = (name: number, type: string) => {
//   console.log(name, type)
// };

// const { request: a } = auseRequest<typeof requestCallback>(requestCallback);
// const { request: b } = auseRequest<AxiosRequestConfig>({ url: '/api' });
// a(1, '1');
// b();

export default useRequest;
