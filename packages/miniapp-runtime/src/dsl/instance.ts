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

export interface ReactAppInstance<T = AppInstance> extends Component<T>, AppInstance {
  //
}

interface Show {
  onShow?: () => void;
  onHide?: () => void;
}

interface AliMiniappEvents {
  onBack?: () => void;
  onKeyboardHeight?: () => void;
  beforeTabItemTap?: () => void;
  onResize?: (options: Record<string, unknown>) => void;
  onSelectedTabItemTap?: (options: Record<string, unknown>) => void;
}

export interface PageLifeCycle extends Show {
  eh?: (event: MpEvent) => void;

  onLoad?: (options: Record<string, unknown>, cb?: Func) => void;
  onUnload?: () => void;
  onReady?: () => void;

  onPullDownRefresh?: () => void;
  onReachBottom?: () => void;
  onResize?: (options: unknown) => void;
  onTabItemTap?: (obj: { index: string; pagePath: string; text: string }) => void;
  onTitleClick?: () => void;
  onOptionMenuClick?: () => void;
  onPopMenuClick?: () => void;
  onPullIntercept?: () => void;
  onAddToFavorites?: () => void;
  onSaveExitState?: () => void;

  onPageScroll?: (obj: { scrollTop: number }) => void;
  onShareAppMessage?: (obj: { from: string; target?: Element; webViewUrl: string }) => void;
  onShareTimeline?: () => void;

  events?: AliMiniappEvents;
}

export interface PageInstance extends PageLifeCycle {
  /** 页面的初始数据 */
  data?: Record<string, unknown>;
  /** 页面路径 */
  path?: string;
  /** 页面的组件选项 */
  options?: Record<string, unknown>;
}

export interface MountOptions {
  id: string;
  routeData?: any;
  routeConfig?: any;
}

export interface AppInstance extends Show {
  mount?: (component: ComponentClass, options: MountOptions, cb: (...args: any[]) => void) => void;
  onError?: (error: string) => void;
  onLaunch?: (options?: Record<string, unknown>) => void;
  onPageNotFound?: (res: any) => void;
  onUnhandledRejection?: (res: any) => void;
  onShareAppMessage?: (options: any) => Record<string, any>;
  onShow?: (options?: Record<string, unknown>) => void;
  unmount?: (id: string, cb?: () => void) => void;
  config?: Record<any, any>;
}
