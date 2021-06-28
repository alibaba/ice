/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-named-default */
import { isMiniAppPlatform, isWeex, isKraken } from './env';
import { default as miniappWithRouter } from './miniapp/enhanceWithRouter';
import { addAppLifeCycle } from './appLifeCycles';
import { withPageLifeCycle, createUsePageLifeCycle } from './pageLifeCycles';
import { default as createMiniappHistory } from './miniapp/history';
import { default as createWebHistory } from './web/history';
import { default as createWeexHistory } from './weex/history';
import { pathRedirect } from './utils';
import getSearchParams from './getSearchParams';
import collectAppLifeCycle from './collectAppLifeCycle';
import { default as initMiniappLifeCycles } from './miniapp/initAppLifeCycles';
import { default as initWeexLifeCycles } from './weex/initAppLifeCycles';
import { default as initWebLifeCycles } from './web/initAppLifeCycles';
import { setHistory, getHistory, history } from './storage';

let initAppLifeCycles;
let createHistory;
let withRouter;

if (isMiniAppPlatform) {
  withRouter = miniappWithRouter;
  createHistory = createMiniappHistory;
  initAppLifeCycles = initMiniappLifeCycles;
}  else if (isWeex || isKraken) {
  createHistory = createWeexHistory;
  initAppLifeCycles = initWeexLifeCycles;
} else {
  createHistory = createWebHistory;
  initAppLifeCycles = initWebLifeCycles;
}

export {
  initAppLifeCycles,
  createHistory,
  withRouter,
  addAppLifeCycle,
  withPageLifeCycle,
  createUsePageLifeCycle,
  pathRedirect,
  getSearchParams,
  collectAppLifeCycle,
  setHistory,
  getHistory,
  history,
};
