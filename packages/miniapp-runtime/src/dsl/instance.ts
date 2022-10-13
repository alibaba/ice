import type { Component, ComponentClass } from 'react';

import type { Element } from '../dom/element.js';
import type { Func, MpEvent } from '../interface/index.js';

export interface Instance<T = Record<string, any>> extends Component<T>, Show, PageInstance {
  tid?: string;
  $forceUpdate?: () => void;
  $nextTick?: (cb: () => void) => void;
  $options: Instance;
}


export interface PageProps {
  tid?: string;
}

export interface ReactPageComponent<T = PageProps> extends ComponentClass<T>, PageInstance {
  //
}

export interface ReactPageInstance<T = PageProps> extends Component<T>, PageInstance {
  componentDidShow?: () => void;
  componentDidHide?: () => void;
}

export interface ReactAppInstance<T = AppInstance> extends Component<T>, AppInstance {
  //
}

export interface PageLifeCycle extends Show {
  eh?: (event: MpEvent) => void;
  onAddToFavorites?: () => void;
  onLoad?: (options: Record<string, unknown>, cb?: Func) => void;
  onOptionMenuClick?: () => void;
  onPageScroll?: (obj: { scrollTop: number }) => void;
  onPullDownRefresh?: () => void;
  onPullIntercept?: () => void;
  onPopMenuClick?: () => void;
  onReachBottom?: () => void;
  onReady?: () => void;
  onResize?: (options: unknown) => void;
  onSaveExitState?: () => void;
  onShareAppMessage?: (obj: { from: string; target?: Element; webViewUrl: string }) => void;
  onShareTimeline?: () => void;
  onTabItemTap?: (obj: { index: string; pagePath: string; text: string }) => void;
  onTitleClick?: () => void;
  onUnload?: () => void;
}

export interface PageInstance extends PageLifeCycle {
  /** 页面的初始数据 */
  data?: Record<string, unknown>;
  /** 页面路径 */
  path?: string;
  /** 页面的组件选项 */
  options?: Record<string, unknown>;
}

interface Show {
  componentDidShow?: () => void;
  componentDidHide?: () => void;
  onShow?: () => void;
  onHide?: () => void;
}

export interface MountOptions {
  id: string;
  routeData?: any;
  routeConfig?: any;
}

export interface AppInstance extends Show {
  componentDidShow?: (options?: Record<string, unknown>) => void;
  mount?: (component: ComponentClass, options: MountOptions, cb: (...args: any[]) => void) => void;
  onError?: (error: string) => void;
  onLaunch?: (options?: Record<string, unknown>) => void;
  onPageNotFound?: (res: any) => void;
  onShow?: (options?: Record<string, unknown>) => void;
  unmount?: (id: string, cb?: () => void) => void;
  config?: Record<any, any>;
}
