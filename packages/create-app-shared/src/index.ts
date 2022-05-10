/* eslint-disable import/no-mutable-exports */
import { isMiniAppPlatform, isWeex } from './env';
import miniappCreateWithRouter from './miniapp/miniappCreateWithRouter';
import { addAppLifeCycle } from './appLifeCycles';
import { withPageLifeCycle as defaultWithPageLifeCycle, createUsePageLifeCycle as defaultCreateUsePageLifeCycle } from './pageLifeCycles';
import { withPageLifeCycle as miniappWithPageLifeCycle, createUsePageLifeCycle as miniappCreateUsePageLifeCycle } from './miniapp/pageLifeCycles';
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
import type { WithPageLifeCycle, CreateUsePageLifeCycle } from './types';

let initAppLifeCycles: () => void;
let createHistory: unknown;
let initHistory: InitHistory;
let emitLifeCycles: () => void;
let withPageLifeCycle: WithPageLifeCycle;
let createUsePageLifeCycle: CreateUsePageLifeCycle;

if (isMiniAppPlatform) {
  createHistory = createMiniappHistory;
  initAppLifeCycles = initMiniappLifeCycles;
  initHistory = initMiniappHistory;
  emitLifeCycles = emitMiniappLifeCycles;
  withPageLifeCycle = miniappWithPageLifeCycle;
  createUsePageLifeCycle = miniappCreateUsePageLifeCycle;
}  else if (isWeex) {
  createHistory = createWeexHistory;
  initAppLifeCycles = initWeexLifeCycles;
  initHistory = initWeexHistory;
  emitLifeCycles = emitAppLifeCycles;
  withPageLifeCycle = defaultWithPageLifeCycle;
  createUsePageLifeCycle = defaultCreateUsePageLifeCycle;
} else {
  createHistory = createWebHistory;
  initAppLifeCycles = initWebLifeCycles;
  initHistory = initWebHistory;
  emitLifeCycles = emitAppLifeCycles;
  withPageLifeCycle = defaultWithPageLifeCycle;
  createUsePageLifeCycle = defaultCreateUsePageLifeCycle;
}

export * from './nativeEventListener';

export {
  initAppLifeCycles,
  createHistory,
  miniappCreateWithRouter,
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
