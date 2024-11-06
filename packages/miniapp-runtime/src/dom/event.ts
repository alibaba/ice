import { EMPTY_OBJ, hooks } from '@ice/shared';

import {
  CONFIRM,
  CURRENT_TARGET,
  INPUT,
  KEY_CODE,
  TARGET,
  TIME_STAMP,
  TOUCHMOVE,
  TYPE,
} from '../constants/index.js';
import env from '../env.js';
import type { EventOptions, MpEvent } from '../interface/index.js';
import { isParentBinded } from '../utils/index.js';
import type { Element } from './element.js';
import { type Node } from './node.js';

// 事件对象。以 Web 标准的事件对象为基础，加入小程序事件对象中携带的部分信息，并模拟实现事件冒泡。
export class Event {
  private cacheTarget;
  private cacheCurrentTarget;

  public type: string;

  public bubbles: boolean;

  public cancelable: boolean;

  public _stop = false;

  public _end = false;

  public defaultPrevented = false;

  // timestamp can either be hi-res ( relative to page load) or low-res (relative to UNIX epoch)
  // here use hi-res timestamp
  public timeStamp = Date.now();

  public mpEvent: MpEvent | undefined;

  public constructor(type: string, opts: EventOptions, event?: MpEvent) {
    this.type = type.toLowerCase();
    this.mpEvent = event;
    this.bubbles = Boolean(opts && opts.bubbles);
    this.cancelable = Boolean(opts && opts.cancelable);
  }

  public stopPropagation() {
    this._stop = true;
  }

  public stopImmediatePropagation() {
    this._end = this._stop = true;
  }

  public preventDefault() {
    this.defaultPrevented = true;
  }

  get target() {
    const { cacheTarget } = this;
    if (cacheTarget) {
      return cacheTarget;
    } else {
      const target = Object.create(this.mpEvent?.target || null);

      const element = env.document.getElementById(target.id);
      target.dataset = element === null ? EMPTY_OBJ : element.dataset;

      for (const key in this.mpEvent?.detail) {
        target[key] = this.mpEvent!.detail[key];
      }

      this.cacheTarget = target;

      return target;
    }
  }

  get currentTarget() {
    const { cacheCurrentTarget } = this;
    if (cacheCurrentTarget) {
      return cacheCurrentTarget;
    } else {
      const doc = env.document;

      const currentTarget = Object.create(this.mpEvent?.currentTarget || null);

      const element = doc.getElementById(currentTarget.id);
      const targetElement = doc.getElementById(this.mpEvent?.target?.id || null);

      if (element === null || (element && element === targetElement)) {
        this.cacheCurrentTarget = this.target;
        return this.target;
      }

      currentTarget.dataset = element.dataset;

      for (const key in this.mpEvent?.detail) {
        currentTarget[key] = this.mpEvent!.detail[key];
      }

      this.cacheCurrentTarget = currentTarget;

      return currentTarget;
    }
  }
}

export function createEvent(event: MpEvent | string, node?: Element) {
  if (typeof event === 'string') {
    // For Vue3 using document.createEvent
    return new Event(event, { bubbles: true, cancelable: true });
  }

  const domEv = new Event(event.type, { bubbles: true, cancelable: true }, event);

  for (const key in event) {
    if (key === CURRENT_TARGET || key === TARGET || key === TYPE || key === TIME_STAMP) {
      continue;
    } else {
      domEv[key] = event[key];
    }
  }

  if (domEv.type === CONFIRM && node?.nodeName === INPUT) {
    // eslint-disable-next-line dot-notation
    domEv[KEY_CODE] = 13;
  }

  return domEv;
}

const eventsBatch = {};

// 小程序的事件代理回调函数
export function eventHandler(event: MpEvent) {
  hooks.call('modifyMpEventImpl', event);

  if (!event.currentTarget) {
    event.currentTarget = event.target;
  }

  const { currentTarget } = event;
  const id = currentTarget.dataset?.sid as string /** sid */ || currentTarget.id /** uid */ || '';

  const node = env.document.getElementById(id);
  if (node) {
    const dispatch = () => {
      const e = createEvent(event, node);
      hooks.call('modifyIceEvent', e, node);
      node.dispatchEvent(e);
    };
    if (hooks.isExist('batchedEventUpdates')) {
      const { type } = event;

      if (
        !hooks.call('isBubbleEvents', type) ||
        !isParentBinded(node, type) ||
        (type === TOUCHMOVE && !!node.props.catchMove)
      ) {
        // 最上层组件统一 batchUpdate
        hooks.call('batchedEventUpdates', () => {
          if (eventsBatch[type]) {
            eventsBatch[type].forEach(fn => fn());
            delete eventsBatch[type];
          }
          dispatch();
        });
      } else {
        // 如果上层组件也有绑定同类型的组件，委托给上层组件调用事件回调
        if (!eventsBatch[type]) {
          eventsBatch[type] = [];
        }
        eventsBatch[type].push(dispatch);
      }
    } else {
      dispatch();
    }
  }
}

export function createEventHandlerForThirdComponent(sid: string, eventName: string) {
  return (...args: unknown[]) => {
    const node = env.document.getElementById(sid);
    if (node) {
      node.triggerEventListenerInternal(eventName, args);
    }
  };
}

export function bindEventHandlersForThirdComponentNode(node: Node) {
  const instance = node._root?.ctx;
  if (!instance) {
    return;
  }
  const eventNames = node.getListenerNames();
  for (const eventName of eventNames) {
    instance[`eh_${node.sid}_${eventName}`] = createEventHandlerForThirdComponent(node.sid, eventName);
  }
}
