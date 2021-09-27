import { SHARE } from './constants';
import { isFunction } from './utils';

interface AppCycles {
  [key: string]: Function[];
}

export const appCycles: AppCycles = {};

/**
 * Emit life cycle callback
 * @param {string} cycle cycle name
 * @param {object} context callback's context when executed
 * @param  {...any} args callback params
 */
export function emit(cycle: string, context?: object, ...args: any) {
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
export function addAppLifeCycle(cycle: string, callback: Function) {
  if (isFunction(callback)) {
    appCycles[cycle] = appCycles[cycle] || [];
    appCycles[cycle].push(callback);
  }
}
