/* eslint-disable import/no-mutable-exports */
import { isMiniAppPlatform, isWeex, isKraken } from './env';
import miniappWithRouter from './miniapp/enhanceWithRouter';
import { addAppLifeCycle } from './appLifeCycles';
import { withPageLifeCycle, createUsePageLifeCycle } from './pageLifeCycles';
import createMiniappHistory, { initHistory as initMiniappHistory } from './miniapp/history';
import createWebHistory, { initHistory as initWebHistory } from './web/history';
import createWeexHistory, { initHistory as initWeexHistory } from './weex/history';
import emitAppLifeCycles from './emitLifeCycles';
import emitMiniappLifeCycles from './miniapp/emitLifeCycles';
import { pathRedirect } from './utils';
import getSearchParams from './getSearchParams';
import collectAppLifeCycle from './collectAppLifeCycle';
import initMiniappLifeCycles from './miniapp/initAppLifeCycles';
import initWeexLifeCycles from './weex/initAppLifeCycles';
import initWebLifeCycles from './web/initAppLifeCycles';
import { setHistory, getHistory, history } from './storage';
import createBaseApp from './createBaseApp';
import type { InitHistory } from './createInitHistory';
import RuntimeModule, { RuntimePlugin } from './runtimeModule';

let initAppLifeCycles: unknown;
let createHistory: unknown;
let withRouter: unknown;
let initHistory: InitHistory;
let emitLifeCycles: () => void;

if (isMiniAppPlatform) {
  withRouter = miniappWithRouter;
  createHistory = createMiniappHistory;
  initAppLifeCycles = initMiniappLifeCycles;
  initHistory = initMiniappHistory;
  emitLifeCycles = emitMiniappLifeCycles;
}  else if (isWeex || isKraken) {
  createHistory = createWeexHistory;
  initAppLifeCycles = initWeexLifeCycles;
  initHistory = initWeexHistory;
  emitLifeCycles = emitAppLifeCycles;
} else {
  createHistory = createWebHistory;
  initAppLifeCycles = initWebLifeCycles;
  initHistory = initWebHistory;
  emitLifeCycles = emitAppLifeCycles;
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
  createBaseApp,
  initHistory,
  emitLifeCycles,
  RuntimeModule,
  RuntimePlugin,
};
export * from './types';