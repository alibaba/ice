import { axios } from '@ice/runtime/axios';
import { isArray } from '@ice/runtime/axiosUtils';
import * as createAppShared from '@ice/runtime/createAppShared';
import { createBrowserHistory } from '@ice/runtime/history';
import { createStore } from '@ice/runtime/iceStore';
import { loadable } from '@ice/runtime/loadable';
import { pathToRegexp } from '@ice/runtime/pathToRegexp';
import { queryString } from '@ice/runtime/queryString';
import { reactAppRenderer, getInitialData } from '@ice/runtime/reactAppRenderer';
import { useBaseRequest } from '@ice/runtime/useRequest';

const isFunction = (fn: unknown) => {
  return typeof fn === 'function';
}

describe('ice-untime', () => {
  test('axios', () => {
    expect(isFunction(axios?.isCancel)).toBe(true);
  });

  test('axiosUtil', () => {
    expect(isFunction(isArray)).toBe(true);
  });

  test('createAppShared', () => {
    expect(isFunction(createAppShared.createHistory)).toBe(true);
  });

  test('history', () => {
    expect(isFunction(createBrowserHistory)).toBe(true);
  });

  test('iceStore', () => {
    expect(isFunction(createStore)).toBe(true);
  });

  test('loadable', () => {
    expect(loadable).not.toBeNaN();
  });

  test('pathToRegexp', () => {
    // @ts-ignore for testing
    expect(isFunction(pathToRegexp.default)).toBe(true);
    expect(isFunction(pathToRegexp)).toBe(false);
  });

  test('queryString', () => {
    expect(isFunction(queryString.parse)).toBe(true);
    // @ts-ignore
    expect(isFunction(queryString.default.parse)).toBe(true);
  });

  test('reactAppRenderer', () => {
    expect(isFunction(reactAppRenderer)).toBe(true);
    // @ts-ignore for testing
    expect(isFunction(reactAppRenderer.default)).toBe(false);

    expect(isFunction(getInitialData)).toBe(true);
  });

  test('useRequest', () => {
    expect(isFunction(useBaseRequest)).toBe(true);
  });

});
