import { EMPTY_OBJ, hooks } from '@ice/shared';
import React, { createElement } from 'react';
import * as ReactDOM from 'react-dom';
import type { MiniappAppConfig, MiniappLifecycles } from '../types.js';
import { Current, getPageInstance,
  incrementId, injectPageInstance,
} from '../index.js';
import type {
  MountOptions,
  AppInstance, Instance,
  PageLifeCycle, PageProps,
  ReactPageComponent,
} from '../index.js';
import { ConfigProvider, DataProvider } from './routeContext.js';
import enableHtmlRuntime from './html/runtime.js';
import { reactMeta } from './react-meta.js';
import { ensureIsArray, HOOKS_APP_ID, isClassComponent, setDefaultDescriptor, setRouterParams } from './utils.js';

type PageComponent = React.CElement<PageProps, React.Component<PageProps, any, any>>;

declare const App: any;

const pageKeyId = incrementId();

export function setReconciler() {
  hooks.tap('modifyMpEvent', (event) => {
    event.type = event.type.replace(/-/g, '');
  });

  hooks.tap('batchedEventUpdates', (cb) => {
    ReactDOM.unstable_batchedUpdates(cb);
  });

  hooks.tap('mergePageInstance', (prev, next) => {
    if (!prev || !next) return;

    // 子组件使用 lifecycle hooks 注册了生命周期后，会存在 prev，里面是注册的生命周期回调。

    // prev 使用 Object.create(null) 创建，H5 的 fast-refresh 可能也会导致存在 prev，要排除这些意外产生的 prev
    if ('constructor' in prev) return;

    Object.keys(prev).forEach(item => {
      const prevList = prev[item];
      const nextList = ensureIsArray<() => any>(next[item]);
      next[item] = nextList.concat(prevList);
    });
  });
}

export function connectReactPage(
  R: typeof React,
  id: string,
) {
  return (Page: ReactPageComponent, { routeData, routeConfig }): React.ComponentClass<PageProps> => {
    const isReactComponent = isClassComponent(R, Page);
    const inject = (node?: Instance) => node && injectPageInstance(node, id);
    const refs = isReactComponent ? { ref: inject } : {
      forwardedRef: inject,
      // 兼容 react-redux 7.20.1+
      reactReduxForwardedRef: inject,
    };

    if (reactMeta.PageContext === EMPTY_OBJ) {
      reactMeta.PageContext = R.createContext('');
    }
    const PageContextProvider = reactMeta.PageContext.Provider;
    return class PageWrapper extends R.Component<PageProps, { hasError: boolean }> {
      state = {
        hasError: false,
      };

      static getDerivedStateFromError(error: Error) {
        triggerAppHook(this, 'onError', error.message + error.stack);
        return { hasError: true };
      }
      render() {
        const children = this.state.hasError
        ? []
        : (<DataProvider value={routeData}>
          <ConfigProvider value={routeConfig}>
            <PageContextProvider value={id}>
              <Page {...this.props} {...refs} />
            </PageContextProvider>
          </ConfigProvider>
        </DataProvider>);
        return createElement(
          'root',
          { id },
          children,
        );
      }
    };
  };
}

type IProps = {
  children: React.ReactNode | undefined;
};

class AppComponent extends React.Component<IProps> {
  render() {
    return this.props.children;
  }
}

let appWrapper: AppWrapper;

export class AppWrapper extends React.Component {
  // run createElement() inside the render function to make sure that owner is right
  private pages: Array<() => PageComponent> = [];
  private elements: Array<PageComponent> = [];

  constructor(props) {
    super(props);
    appWrapper = this;
  }

  public mount(pageComponent: ReactPageComponent, { id, routeData, routeConfig }: MountOptions, cb: () => void) {
    const pageWrapper = connectReactPage(React, id)(pageComponent, { routeData, routeConfig });
    const key = id + pageKeyId();
    const page = () => createElement(pageWrapper, { key, tid: id });
    this.pages.push(page);
    this.forceUpdate(cb);
  }

  public unmount(id: string, cb: () => void) {
    const { elements } = this;
    const idx = elements.findIndex(item => item.props.tid === id);
    elements.splice(idx, 1);
    this.forceUpdate(cb);
  }

  public render() {
    const { pages, elements } = this;

    while (pages.length > 0) {
      const page = pages.pop()!;
      elements.push(page());
    }

    const props: React.ComponentProps<any> | null = {};

    return createElement(
      AppComponent,
      props,
      elements.slice(),
    );
  }
}

/**
 * 桥接小程序 App 构造器和 React 渲染流程
 * @param react 框架
 * @param dom 框架渲染器
 * @param config 入口组件配置 app.config.js 的内容
 * @returns 传递给 App 构造器的对象 obj ：App(obj)
 */
 export function createMiniApp(
  config: MiniappAppConfig,
  lifecycles: MiniappLifecycles,
) {
  setReconciler();
  enableHtmlRuntime();

  const [ON_LAUNCH, ON_SHOW, ON_HIDE, ON_ERROR, ON_PAGE_NOT_FOUND, ON_UNHANDLED_REJECTION] = hooks.call('getMiniLifecycleImpl')!.app;

  const appObj: AppInstance = Object.create({
    render(cb: () => void) {
      appWrapper.forceUpdate(cb);
    },

    mount(component: ReactPageComponent, { id, routeData, routeConfig }: MountOptions, cb: () => void) {
      appWrapper.mount(component, { id, routeData, routeConfig }, cb);
    },

    unmount(id: string, cb: () => void) {
      appWrapper.unmount(id, cb);
    },
  }, {
    config: setDefaultDescriptor({
      configurable: true,
      value: config,
    }),

    [ON_LAUNCH]: setDefaultDescriptor({
      value(options) {
        setRouterParams(options);
        triggerAppHook(this, 'onLaunch', options);
      },
    }),

    [ON_SHOW]: setDefaultDescriptor({
      value(options) {
        setRouterParams(options);
        triggerAppHook(this, 'onShow', options);
      },
    }),

    [ON_HIDE]: setDefaultDescriptor({
      value() {
        triggerAppHook(this, 'onHide');
      },
    }),

    [ON_ERROR]: setDefaultDescriptor({
      value(error: string) {
        triggerAppHook(this, 'onError', error);
      },
    }),

    [ON_PAGE_NOT_FOUND]: setDefaultDescriptor({
      value(res: unknown) {
        triggerAppHook(this, 'onPageNotFound', res);
      },
    }),

    [ON_UNHANDLED_REJECTION]: setDefaultDescriptor({
      value(res: unknown) {
        triggerAppHook(this, 'onUnhandledRejection', res);
      },
    }),
  });

  if (lifecycles.onShareAppMessage) {
    // Only works in ali miniapp
    appObj.onShareAppMessage = function (res) {
      return triggerAppHook(this, 'onShareAppMessage', res);
    };
  }

  Current.app = appObj;
  return App(appObj);
}

function triggerAppHook(app: unknown, lifecycle: keyof PageLifeCycle | keyof AppInstance, ...option): any {
  const instance = getPageInstance(HOOKS_APP_ID);
  if (instance) {
    const func = hooks.call('getLifecycle', instance, lifecycle);
    if (Array.isArray(func)) {
      if (lifecycle === 'onShareAppMessage') {
        return func[0].apply(app, option);
      }
      func.forEach(cb => cb.apply(app, option));
    }
  }
}
