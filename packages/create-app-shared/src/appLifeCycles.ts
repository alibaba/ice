import { isWeex } from 'universal-env';
import { isMiniAppPlatform } from './env';
import { SHOW, HIDE, ERROR, LAUNCH, NOT_FOUND, SHARE, TAB_ITEM_CLICK } from './constants';
import { isFunction } from './utils';
import { getHistory } from './history';
import router from './router';
import { emit as pageEmit } from './pageLifeCycles';

export const appCycles = {};

// eslint-disable-next-line
declare var __weex_require__: any;

/**
 * Emit life cycle callback
 * @param {string} cycle cycle name
 * @param {object} context callback's context when executed
 * @param  {...any} args callback params
 */
export function emit(cycle: any, context?: any, ...args) {
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

// Emit MiniApp App lifeCycles
if (isMiniAppPlatform) {
  window.addEventListener(LAUNCH, ({ options, context }: any) => {
    emit(LAUNCH, context, options);
  });
  window.addEventListener('appshow', ({ options, context }: any) => {
    emit(SHOW, context, options);
  });
  window.addEventListener('apphide', ({ context }: any) => {
    emit(HIDE, context);
  });
  window.addEventListener('apperror', ({ context, error }: any) => {
    emit(ERROR, context, error);
  });
  window.addEventListener('pagenotfound', ({ context }: any) => {
    emit(NOT_FOUND, context);
  });
  window.addEventListener('appshare', ({ context, shareInfo, options }: any) => {
    emit(SHARE, context, shareInfo, options);
  });
  window.addEventListener('tabitemclick', ({ options, context }: any) => {
    emit(TAB_ITEM_CLICK, context, options);
  });
} else if (isWeex) {
  try {
    // https://weex.apache.org/docs/modules/globalEvent.html#addeventlistener
    // Use __weex_require__ in Rax project.
    const globalEvent = __weex_require__('@weex-module/globalEvent');
    globalEvent.addEventListener('WXApplicationDidBecomeActiveEvent', function() {
      router.current.visibiltyState = true;
      // Emit app show
      emit(SHOW);
      // Emit page show
      pageEmit(SHOW, router.current.pathname);
    });
    globalEvent.addEventListener('WXApplicationWillResignActiveEvent', function() {
      router.current.visibiltyState = false;
      // Emit page hide
      pageEmit(HIDE, router.current.pathname);
      // Emit app hide
      emit(HIDE);
    });
  } catch (err) {
    console.log(`@weex-module/globalEvent error: ${  err}`);
  }
} else if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', function() {
    // Get history
    const history = getHistory();
    const currentPathName = history ? history.location.pathname : router.current.pathname;
    // The app switches from foreground to background
    if (currentPathName === router.current.pathname) {
      router.current.visibiltyState = !router.current.visibiltyState;
      if (router.current.visibiltyState) {
        // Emit app show
        emit(SHOW);
        // Emit page show
        pageEmit(SHOW, router.current.pathname);
      } else {
        // Emit page hide
        pageEmit(HIDE, router.current.pathname);
        // Emit app hide
        emit(HIDE);
      }
    }
  });
  // Emit error lifeCycles
  window.addEventListener('error', event => {
    emit(ERROR, null, event.error);
  });
}
