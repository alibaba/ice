/* eslint-disable dot-notation */
import { EMPTY_OBJ, ensure, hooks, isArray, isFunction, isString, isUndefined, Shortcuts } from '@ice/shared';
import type * as React from 'react';
import type { MiniappPageConfig } from '../types.js';

import { raf } from '../bom/raf.js';
import { BEHAVIORS, CUSTOM_WRAPPER, EXTERNAL_CLASSES, ON_HIDE, ON_LOAD, ON_READY, ON_SHOW, OPTIONS, PAGE_INIT, VIEW } from '../constants/index.js';
import { Current } from '../current.js';
import { eventHandler } from '../dom/event.js';
import type { RootElement } from '../dom/root.js';
import { eventCenter } from '../emitter/emitter.js';
import env from '../env.js';
import type { Func, MpInstance } from '../interface/index.js';
import { perf } from '../perf.js';
import { customWrapperCache, incrementId } from '../utils/index.js';
import type { Instance, PageInstance, PageProps } from './instance.js';

const instances = new Map<string, Instance>();
const pageId = incrementId();

export function injectPageInstance(inst: Instance<PageProps>, id: string) {
  hooks.call('mergePageInstance', instances.get(id), inst);
  instances.set(id, inst);
}

export function getPageInstance(id: string): Instance | undefined {
  return instances.get(id);
}

export function addLeadingSlash(path?: string): string {
  if (path == null) {
    return '';
  }
  return path.charAt(0) === '/' ? path : `/${path}`;
}

export function safeExecute(path: string, lifecycle: string, ...args: unknown[]) {
  const instance = instances.get(path);

  if (instance == null) {
    return;
  }

  const func = hooks.call('getLifecycle', instance, lifecycle as keyof PageInstance);

  if (isArray(func)) {
    const res = func.map(fn => fn.apply(instance, args));
    return res[0];
  }

  if (!isFunction(func)) {
    return;
  }

  return func.apply(instance, args);
}

export function stringify(obj?: Record<string, unknown>) {
  if (obj == null) {
    return '';
  }
  const path = Object.keys(obj).map((key) => {
    return `${key}=${obj[key]}`;
  }).join('&');
  return path === '' ? path : `?${path}`;
}

export function getPath(id: string, options?: Record<string, unknown>): string {
  const idx = id.indexOf('?');
  return `${idx > -1 ? id.substring(0, idx) : id}${stringify(options)}`;
}

export function getOnReadyEventKey(path: string) {
  return `${path}.${ON_READY}`;
}

export function getOnShowEventKey(path: string) {
  return `${path}.${ON_SHOW}`;
}

export function getOnHideEventKey(path: string) {
  return `${path}.${ON_HIDE}`;
}

export function createPageConfig(
  component: any,
  pageName: string,
  data: Record<string, unknown>,
  { getData, getConfig },
  pageConfig?: MiniappPageConfig) {
  // 小程序 Page 构造器是一个傲娇小公主，不能把复杂的对象挂载到参数上
  const id = pageName ?? `ice_page_${pageId()}`;
  const [
    ONLOAD,
    ONUNLOAD,
    ONREADY,
    ONSHOW,
    ONHIDE,
    LIFECYCLES,
  ] = hooks.call('getMiniLifecycleImpl')!.page;
  let pageElement: RootElement | null = null;
  let unmounting = false;
  let prepareMountList: (() => void)[] = [];

  function setCurrentRouter(page: MpInstance) {
    const router = page.route || page.__route__ || page.$icePath;
    Current.router = {
      params: page.$iceParams!,
      path: addLeadingSlash(router),
      $icePath: page.$icePath,
      onReady: getOnReadyEventKey(id),
      onShow: getOnShowEventKey(id),
      onHide: getOnHideEventKey(id),
    };
    if (!isUndefined(page.exitState)) {
      Current.router.exitState = page.exitState;
    }
  }
  let loadResolver: (...args: unknown[]) => void;
  let hasLoaded: Promise<void>;
  const config: PageInstance = {
    [ONLOAD](this: MpInstance, options: Readonly<Record<string, unknown>> = {}, cb?: Func) {
      hasLoaded = new Promise(resolve => { loadResolver = resolve; });

      perf.start(PAGE_INIT);

      Current.page = this as any;
      this.config = pageConfig || {};

      // this.$icePath 是页面唯一标识
      const uniqueOptions = Object.assign({}, options);
      const $icePath = this.$icePath = getPath(id, uniqueOptions);
      // this.$iceParams 作为暴露给开发者的页面参数对象，可以被随意修改
      if (this.$iceParams == null) {
        this.$iceParams = uniqueOptions;
      }

      setCurrentRouter(this);
      const routeConfig = getConfig?.();
      if (!getData) {
        getData = () => new Promise<void>(resolve => resolve());
      }
      const mount = () => {
        getData(this.$iceParams!).then(routeData => {
          Current.app!.mount!(component, { id: $icePath, routeData, routeConfig }, () => {
            pageElement = env.document.getElementById<RootElement>($icePath);

            ensure(pageElement !== null, '没有找到页面实例。');
            safeExecute($icePath, ON_LOAD, this.$iceParams);
            loadResolver();
            pageElement.ctx = this;
            pageElement.performUpdate(true, cb);
          });
        });
      };

      if (unmounting) {
        prepareMountList.push(mount);
      } else {
        mount();
      }
    },
    [ONUNLOAD]() {
      const { $icePath } = this;
      // 触发onUnload生命周期
      safeExecute($icePath, ONUNLOAD);
      unmounting = true;
      Current.app!.unmount!($icePath, () => {
        unmounting = false;
        instances.delete($icePath);
        if (pageElement) {
          pageElement.ctx = null;
          pageElement = null;
        }
        if (prepareMountList.length) {
          prepareMountList.forEach(fn => fn());
          prepareMountList = [];
        }
      });
    },
    [ONREADY]() {
      // 触发生命周期
      safeExecute(this.$icePath, ON_READY);
      // 通过事件触发子组件的生命周期
      raf(() => eventCenter.trigger(getOnReadyEventKey(id)));
      this.onReady.called = true;
    },
    [ONSHOW](options = {}) {
      hasLoaded.then(() => {
        // 设置 Current 的 page 和 router
        Current.page = this as any;
        setCurrentRouter(this);
        // 触发生命周期
        safeExecute(this.$icePath, ON_SHOW, options);
        // 通过事件触发子组件的生命周期
        raf(() => eventCenter.trigger(getOnShowEventKey(id)));
      });
    },
    [ONHIDE]() {
      // 设置 Current 的 page 和 router
      if (Current.page === this) {
        Current.page = null;
        Current.router = null;
      }
      // 触发生命周期
      safeExecute(this.$icePath, ON_HIDE);
      // 通过事件触发子组件的生命周期
      eventCenter.trigger(getOnHideEventKey(id));
    },
  };

  LIFECYCLES.forEach((lifecycle) => {
    config[lifecycle] = function (...args) {
      return safeExecute(this.$icePath, lifecycle, ...args);
    };
  });

  // onShareAppMessage 和 onShareTimeline 一样，会影响小程序右上方按钮的选项，因此不能默认注册。
  if (component.onShareAppMessage ||
      component.prototype?.onShareAppMessage ||
      component.enableShareAppMessage) {
    config.onShareAppMessage = function (options) {
      const target = options?.target;
      if (target) {
        const { id } = target;
        const element = document.getElementById(id);
        if (element) {
          target!.dataset = element.dataset;
        }
      }
      return safeExecute(this.$icePath, 'onShareAppMessage', options);
    };
  }
  if (component.onShareTimeline ||
      component.prototype?.onShareTimeline ||
      component.enableShareTimeline) {
    config.onShareTimeline = function () {
      return safeExecute(this.$icePath, 'onShareTimeline');
    };
  }

  config.eh = eventHandler;

  if (!isUndefined(data)) {
    config.data = data;
  }

  hooks.call('modifyPageObject', config);

  return config;
}

export function createComponentConfig(
  component: React.ComponentClass,
  componentName?: string,
  data?: Record<string, unknown>,
) {
  const id = componentName ?? `ice_component_${pageId()}`;
  let componentElement: RootElement | null = null;

  const config: any = {
    attached() {
      perf.start(PAGE_INIT);
      const path = getPath(id, { id: this.getPageId?.() || pageId() });
      Current.app!.mount!(component, { id: path }, () => {
        componentElement = env.document.getElementById<RootElement>(path);
        ensure(componentElement !== null, '没有找到组件实例。');
        this.$iceInstances = instances.get(path);
        safeExecute(path, ON_LOAD);
        if (componentElement) {
          componentElement.ctx = this;
          componentElement.performUpdate(true);
        }
      });
    },
    detached() {
      const path = getPath(id, { id: this.getPageId() });
      Current.app!.unmount!(path, () => {
        instances.delete(path);
        if (componentElement) {
          componentElement.ctx = null;
        }
      });
    },
    methods: {
      eh: eventHandler,
    },
  };

  if (!isUndefined(data)) {
    config.data = data;
  }

  [OPTIONS, EXTERNAL_CLASSES, BEHAVIORS].forEach(key => {
    config[key] = component[key] ?? EMPTY_OBJ;
  });

  return config;
}

export function createRecursiveComponentConfig(componentName?: string) {
  const isCustomWrapper = componentName === CUSTOM_WRAPPER;
  const lifeCycles = isCustomWrapper
    ? {
      attached() {
        const componentId = this.data.i?.sid;
        if (isString(componentId)) {
          customWrapperCache.set(componentId, this);
        }
      },
      detached() {
        const componentId = this.data.i?.sid;
        if (isString(componentId)) {
          customWrapperCache.delete(componentId);
        }
      },
    }
    : EMPTY_OBJ;

  return {
    properties: {
      i: {
        type: Object,
        value: {
          [Shortcuts.NodeName]: VIEW,
        },
      },
      l: {
        type: String,
        value: '',
      },
    },
    options: {
      addGlobalClass: true,
      virtualHost: !isCustomWrapper,
    },
    methods: {
      eh: eventHandler,
    },
    ...lifeCycles,
  };
}
