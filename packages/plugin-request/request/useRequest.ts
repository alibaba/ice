import { useReducer } from 'react'
import axiosInstance from './axiosInstance'

/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} data - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
function useRequest(options) {
  const initialState = {
    data: null,
    loading: false,
    error: null
  };
  const [state, dispatch] = useReducer(requestReducer, initialState)

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
   */
  async function request(config) {
    try {
      dispatch({
        type: 'init'
      });

      const response = await axiosInstance({
        ...options,
        ...config
      })

      dispatch({
        type: 'success',
        data: response.data
      })
      return response.data
    } catch (error) {
      dispatch({
        type: 'error',
        error
      })
      throw error
    }
  }

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
    case 'init':
      return {
        data: null,
        error: null,
        loading: true
      }
    case 'success':
      return {
        data: action.data,
        error: null,
        loading: false
      }
    case 'error':
      return {
        data: null,
        error: action.error,
        loading: false
      };
    default:
      return {
        data: null,
        error: null,
        loading: false
      }
  }
}

export default useRequest
