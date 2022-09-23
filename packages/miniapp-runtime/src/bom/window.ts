import { isString } from '@ice/shared';

import { Events } from '../emitter/emitter.js';
import env from '../env.js';
import { getComputedStyle } from './getComputedStyle.js';
import { navigator } from './navigator.js';
import { caf, raf } from './raf.js';

class Window extends Events {
  navigator = navigator;
  requestAnimationFrame = raf;
  cancelAnimationFrame = caf;
  getComputedStyle = getComputedStyle;
  Date: DateConstructor;

  constructor() {
    super();

    const globalProperties = [
      ...Object.getOwnPropertyNames(global || {}),
      ...Object.getOwnPropertySymbols(global || {}),
    ];

    globalProperties.forEach(property => {
      if (property === 'atob' || property === 'document') return;
      if (!Object.prototype.hasOwnProperty.call(this, property)) {
        this[property] = global[property];
      }
    });

    if (!this.Date) {
      this.Date = Date;
    }
  }

  get document() {
    return env.document;
  }

  addEventListener(event: string, callback: (arg: any) => void) {
    if (!isString(event)) return;
    this.on(event, callback, null);
  }

  removeEventListener(event: string, callback: (arg: any) => void) {
    if (!isString(event)) return;
    this.off(event, callback, null);
  }

  setTimeout(...args: Parameters<typeof setTimeout>) {
    return setTimeout(...args);
  }

  clearTimeout(...args: Parameters<typeof clearTimeout>) {
    return clearTimeout(...args);
  }
}

const window = env.window = new Window();

export {
  window,
};
