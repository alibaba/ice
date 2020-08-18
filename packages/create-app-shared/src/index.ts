import enhanceWithRouter from './enhanceWithRouter';
import { addAppLifeCycle } from './appLifeCycles';
import { withPageLifeCycle, createUsePageLifeCycle } from './pageLifeCycles';
import emitLifeCycles from './emitLifeCycles';
import createBaseApp from './createBaseApp';
import { createHistory, getHistory, history } from './history';
import { pathRedirect } from './utils';
import {
  registerNativeEventListeners,
  addNativeEventListener,
  removeNativeEventListener
} from './nativeEventListener';
import useSearchParams from './useSearchParams';
import withSearchParams from './withSearchParams';
import collectAppLifeCycle from './collectAppLifeCycle';

function createShareAPI({ withRouter, createElement, useEffect }, loadRuntimeModules) {
  const { usePageShow, usePageHide } = createUsePageLifeCycle({ useEffect });
  return {
    createBaseApp: createBaseApp({ loadRuntimeModules, createElement }),

    // history api
    withRouter: enhanceWithRouter({ withRouter, createElement }),
    createHistory,
    getHistory,
    useSearchParams,
    withSearchParams: withSearchParams(createElement),

    // lifeCycle api
    emitLifeCycles,
    collectAppLifeCycle,
    usePageShow,
    usePageHide,
    withPageLifeCycle,
    addAppLifeCycle,

    // utils api
    pathRedirect,
    registerNativeEventListeners,
    addNativeEventListener,
    removeNativeEventListener
  };
};

export {
  history
};

export default createShareAPI;
