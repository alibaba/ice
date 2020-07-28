import enhanceWithRouter from './enhanceWithRouter';
import { withPageLifeCycle, createUsePageLifeCycle } from './pageLifeCycles';
import emitLifeCycles from './emitLifeCycles';
import createBaseApp from './createBaseApp';
import { createHistory, getHistory } from './history';
import { pathRedirect } from './utils';
import {
  registerNativeEventListeners,
  addNativeEventListener,
  removeNativeEventListener
} from './nativeEventListener';
import useSearchParams from './useSearchParams';
import withSearchParams from './withSearchParams';

function createShareAPI({ withRouter, createElement, useEffect, loadRuntimeModules, loadStaticModules }) {
  const { usePageShow, usePageHide } = createUsePageLifeCycle({ useEffect });
  return {
    createBaseApp: createBaseApp({ loadRuntimeModules, loadStaticModules, createElement }),

    // history api
    withRouter: enhanceWithRouter({ withRouter, createElement }),
    createHistory,
    getHistory,
    useSearchParams,
    withSearchParams: withSearchParams(createElement),

    // lifeCycle api
    emitLifeCycles,
    usePageShow,
    usePageHide,
    withPageLifeCycle,

    // utils api
    pathRedirect,
    registerNativeEventListeners,
    addNativeEventListener,
    removeNativeEventListener
  };
};

export default createShareAPI;
