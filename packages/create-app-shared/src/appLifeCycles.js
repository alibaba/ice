/* eslint no-undef:0 */
import { SHOW, HIDE, ERROR, LAUNCH, NOT_FOUND, SHARE, TAB_ITEM_CLICK } from './constants';
import { isFunction, isUndef } from './utils';
import { isMiniAppPlatform } from './env';
import { getHistory } from './history';
import router from './router';
import { emit as pageEmit } from './pageLifeCycles';

export const appCycles = {};

/**
 * Emit life cycle callback
 * @param {string} cycle cycle name
 * @param {object} context callback's context when executed
 * @param  {...any} args callback params
 */
export function emit(cycle, context, ...args) {
  if (Object.prototype.hasOwnProperty.call(appCycles, cycle)) {
    const cycles = appCycles[cycle];
    if (cycle === SHARE) {
      // In MiniApp, it need return callback result as share info, like { title, desc, path }
      args[0].content = context ? cycles[0].call(context, args[1]) : cycles[0](args[1]);
    } else {
      cycles.forEach(fn => {
        // eslint-disable-next-line
        context ? fn.apply(context, args) : fn(...args);
      });
    }
  }
}

/**
 * Add app lifecycle callback
 * @param {string} cycle cycle name
 * @param {function} callback cycle callback
 */
export function addAppLifeCycle(cycle, callback) {
  if (isFunction(callback)) {
    // eslint-disable-next-line
    const cycles = appCycles[cycle] = appCycles[cycle] || [];
    cycles.push(callback);
  }
}

// All of the following hooks will be removed when the future break change
export function useAppLaunch(callback) {
  addAppLifeCycle(LAUNCH, callback);
}

export function useAppShow(callback) {
  addAppLifeCycle(SHOW, callback);
}

export function useAppHide(callback) {
  addAppLifeCycle(HIDE, callback);
}

export function useAppError(callback) {
  addAppLifeCycle(ERROR, callback);
}

export function usePageNotFound(callback) {
  addAppLifeCycle(NOT_FOUND, callback);
}

export function useAppShare(callback) {
  addAppLifeCycle('appshare', callback);
}

// Emit MiniApp App lifeCycles
if (isMiniAppPlatform) {
  window.addEventListener(LAUNCH, ({ options, context }) => {
    emit(LAUNCH, context, options);
  });
  window.addEventListener('appshow', ({ options, context }) => {
    emit(SHOW, context, options);
  });
  window.addEventListener('apphide', ({ context }) => {
    emit(HIDE, context);
  });
  window.addEventListener('apperror', ({ context, error }) => {
    emit(ERROR, context, error);
  });
  window.addEventListener('pagenotfound', ({ context }) => {
    emit(NOT_FOUND, context);
  });
  window.addEventListener('appshare', ({ context, shareInfo, options }) => {
    emit(SHARE, context, shareInfo, options);
  });
  window.addEventListener('tabitemclick', ({ options, context }) => {
    emit(TAB_ITEM_CLICK, context, options);
  });
} else if (!isUndef(document) && !isUndef(window)) {
  document.addEventListener('visibilitychange', function() {
    // The app switches from foreground to background
    const history = getHistory();
    if (router.current && history.location.pathname === router.current.path) {
      router.current.visibiltyState = !router.current.visibiltyState;
      if (router.current.visibiltyState) {
        // Emit app show
        emit(SHOW);
        // Emit page show
        pageEmit(SHOW, router.current.path);
      } else {
        // Emit app hide
        emit(HIDE);
        // Emit page hide
        pageEmit(HIDE, router.current.path);
      }
    }
  });
  // Emit error lifeCycles
  window.addEventListener('error', event => {
    emit(ERROR, null, event.error);
  });
}
