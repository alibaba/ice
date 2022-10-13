import { Events } from '../event-emitter.js';
import { isFunction } from '../is.js';
import type { Shortcuts } from './template.js';

type Func = (...args: any[]) => any;

export enum HOOK_TYPE {
  SINGLE,
  MULTI,
  WATERFALL,
}

interface Hook {
  type: HOOK_TYPE;
  initial?: Func | null;
}

interface Node {
  next: Node;
  context?: any;
  callback?: Func;
}

interface MiniLifecycle {
  app: [
    string, /** onLaunch */
    string, /** onShow */
    string, /** onHide */
  ];
  page: [
    string, /** onLoad */
    string, /** onUnload */
    string, /** onReady */
    string, /** onShow */
    string, /** onHide */
    string[], /** others */
    string[], /** side-effects */
  ];
}

interface MiniElementData {
  [Shortcuts.Childnodes]?: MiniData[];
  [Shortcuts.NodeName]: string;
  [Shortcuts.Class]?: string;
  [Shortcuts.Style]?: string;
  uid?: string;
  sid: string;
  [key: string]: unknown;
}

interface MiniTextData {
  [Shortcuts.Text]: string;
  [Shortcuts.NodeName]: string;
}

type MiniData = MiniElementData | MiniTextData;

interface UpdatePayload {
  path: string;
  value: string | boolean | (() => MiniData | MiniData[]);
}

type Target = Record<string, unknown> & { dataset: Record<string, unknown>; id: string };

interface MpEvent {
  type: string;
  detail: Record<string, unknown>;
  target: Target;
  currentTarget: Target;
}

const defaultMiniLifecycle: MiniLifecycle = {
  app: [
    'onLaunch',
    'onShow',
    'onHide',
  ],
  page: [
    'onLoad',
    'onUnload',
    'onReady',
    'onShow',
    'onHide',
    [
      'onPullDownRefresh',
      'onReachBottom',
      'onPageScroll',
      'onResize',
      'onTabItemTap',
      'onTitleClick',
      'onOptionMenuClick',
      'onPopMenuClick',
      'onPullIntercept',
      'onAddToFavorites',
    ],
    [
      'onShareAppMessage',
      'onShareTimeline',
    ],
  ],
};

export function IceHook(type: HOOK_TYPE, initial?: Func): Hook {
  return {
    type,
    initial: initial || null,
  };
}

export class IceHooks<T extends Record<string, Func> = any> extends Events {
  hooks: Record<keyof T, Hook>;

  constructor(hooks: Record<keyof T, Hook>, opts?) {
    super(opts);
    this.hooks = hooks;
    for (const hookName in hooks) {
      const { initial } = hooks[hookName];
      if (isFunction(initial)) {
        this.on(hookName, initial);
      }
    }
  }

  private tapOneOrMany<K extends Extract<keyof T, string>>(hookName: K, callback: T[K] | T[K][]) {
    const list = isFunction(callback) ? [callback] : callback;
    list.forEach(cb => this.on(hookName, cb));
  }

  tap<K extends Extract<keyof T, string>>(hookName: K, callback: T[K] | T[K][]) {
    const { hooks } = this;
    const { type, initial } = hooks[hookName];
    if (type === HOOK_TYPE.SINGLE) {
      this.off(hookName);
      this.on(hookName, isFunction(callback) ? callback : callback[callback.length - 1]);
    } else {
      initial && this.off(hookName, initial);
      this.tapOneOrMany(hookName, callback);
    }
  }

  call<K extends Extract<keyof T, string>>(hookName: K, ...rest: Parameters<T[K]>): ReturnType<T[K]> | undefined {
    const hook = this.hooks[hookName];
    if (!hook) return;

    const { type } = hook;

    const calls = this.callbacks;
    if (!calls) return;

    const list = calls[hookName] as { tail: Node; next: Node };

    if (list) {
      const { tail } = list;
      let node: Node = list.next;
      let args = rest;
      let res;

      while (node !== tail) {
        res = node.callback?.apply(node.context || this, args);
        if (type === HOOK_TYPE.WATERFALL) {
          const params: any = [res];
          args = params;
        }
        node = node.next;
      }
      return res;
    }
  }

  isExist(hookName: string) {
    return Boolean(this.callbacks?.[hookName]);
  }
}

type IIceHooks = {
  /** 小程序端 App、Page 构造对象的生命周期方法名称 */
  getMiniLifecycle: (defaultConfig: MiniLifecycle) => MiniLifecycle;
  getMiniLifecycleImpl: () => MiniLifecycle;
  /** 解决 React 生命周期名称的兼容问题 */
  getLifecycle: (instance, lifecyle) => Func | Array<Func> | undefined;
  /** 解决百度小程序的模版语法问题 */
  getPathIndex: (indexOfNode: number) => string;
  /** 解决支付宝小程序分包时全局作用域不一致的问题 */
  getEventCenter: (EventsClass: typeof Events) => Events;
  isBubbleEvents: (eventName: string) => boolean;
  getSpecialNodes: () => string[];
  /** 解决 Vue2 布尔值属性值的设置问题 */
  onRemoveAttribute: (element, qualifiedName: string) => boolean;
  /** 用于把 React 同一事件回调中的所有 setState 合并到同一个更新处理中 */
  batchedEventUpdates: (cb: Func) => void;
  /** 用于处理 React 中的小程序生命周期 hooks */
  mergePageInstance: (prev, next) => void;
  /** 用于修改传递给小程序 Page 构造器的对象 */
  modifyPageObject: (config: Record<any, any>) => void;
  /** H5 下拉刷新 wrapper */
  createPullDownComponent: (el, path: string, framework, customWrapper?: any) => void;
  /** H5 获取原生 DOM 对象 */
  getDOMNode: (instance) => any;
  /**
   * @todo: multi
   * 修改 ICE Miniapp DOM 序列化数据
   * */
  modifyHydrateData: (data: Record<string, any>) => void;
  /**
    * @todo: multi
    * 修改 ICE DOM 序列化数据
    * */
  modifySetAttrPayload: (element, key: string, payload: UpdatePayload, componentsAlias: Record<string, any>) => void;
  /**
    * @todo: multi
    * 修改 ICE Miniapp DOM 序列化数据
    * */
  modifyRmAttrPayload: (element, key: string, payload: UpdatePayload, componentsAlias: Record<string, any>) => void;
  /**
    * @todo: multi
    * 调用 addEventListener 时触发
    * */
  onAddEvent: (type: string, handler, options: any, node) => void;
  /** 用于修改小程序原生事件对象 */
  modifyMpEvent: (event: MpEvent) => void;
  modifyMpEventImpl: (event: MpEvent) => void;
  /** 用于修改 ICE Miniapp DOM 事件对象 */
  modifyIceEvent: (event, element) => void;

  modifyDispatchEvent: (event, element) => void;
  initNativeApi: (ice: Record<string, any>) => void;
  patchElement: (node) => void;
};

export const hooks = new IceHooks<IIceHooks>({
  getMiniLifecycle: IceHook(HOOK_TYPE.SINGLE, defaultConfig => defaultConfig),

  getMiniLifecycleImpl: IceHook(HOOK_TYPE.SINGLE, function (this: IceHooks<IIceHooks>) {
    return this.call('getMiniLifecycle', defaultMiniLifecycle);
  }),

  getLifecycle: IceHook(HOOK_TYPE.SINGLE, (instance, lifecycle) => instance[lifecycle]),

  getPathIndex: IceHook(HOOK_TYPE.SINGLE, indexOfNode => `[${indexOfNode}]`),

  getEventCenter: IceHook(HOOK_TYPE.SINGLE, Events => new Events()),

  isBubbleEvents: IceHook(HOOK_TYPE.SINGLE, eventName => {
    /**
     * 支持冒泡的事件, 除 支付宝小程序外，其余的可冒泡事件都和微信保持一致
     * 详见 见 https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html
     */
    const BUBBLE_EVENTS = new Set([
      'touchstart',
      'touchmove',
      'touchcancel',
      'touchend',
      'touchforcechange',
      'tap',
      'longpress',
      'longtap',
      'transitionend',
      'animationstart',
      'animationiteration',
      'animationend',
    ]);

    return BUBBLE_EVENTS.has(eventName);
  }),

  getSpecialNodes: IceHook(HOOK_TYPE.SINGLE, () => ['view', 'text', 'image']),

  onRemoveAttribute: IceHook(HOOK_TYPE.SINGLE),

  batchedEventUpdates: IceHook(HOOK_TYPE.SINGLE),

  mergePageInstance: IceHook(HOOK_TYPE.SINGLE),

  modifyPageObject: IceHook(HOOK_TYPE.SINGLE),

  createPullDownComponent: IceHook(HOOK_TYPE.SINGLE),

  getDOMNode: IceHook(HOOK_TYPE.SINGLE),

  modifyHydrateData: IceHook(HOOK_TYPE.SINGLE),

  modifySetAttrPayload: IceHook(HOOK_TYPE.SINGLE),

  modifyRmAttrPayload: IceHook(HOOK_TYPE.SINGLE),

  onAddEvent: IceHook(HOOK_TYPE.SINGLE),

  modifyMpEvent: IceHook(HOOK_TYPE.MULTI),

  modifyMpEventImpl: IceHook(HOOK_TYPE.SINGLE, function (this: IceHooks<IIceHooks>, e: MpEvent) {
    try {
      // 有些小程序的事件对象的某些属性只读
      this.call('modifyMpEvent', e);
    } catch (error) {
      console.warn('[ICE modifyMpEvent hook Error]: ', error);
    }
  }),

  modifyIceEvent: IceHook(HOOK_TYPE.MULTI),

  modifyDispatchEvent: IceHook(HOOK_TYPE.MULTI),

  initNativeApi: IceHook(HOOK_TYPE.MULTI),

  patchElement: IceHook(HOOK_TYPE.MULTI),
});
