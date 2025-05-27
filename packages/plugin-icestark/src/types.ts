import type { ComponentType } from 'react';
import type { CompatibleAppConfig } from '@ice/stark/lib/AppRoute';
import type { AppRouterProps } from '@ice/stark/lib/AppRouter';
import type { AppRoute } from '@ice/stark';

export interface RouteInfo {
  pathname?: string;
  query?: object;
  hash?: string;
  routeType?: string;
}

export type FrameworkComponent = ComponentType<RouteInfo>;

export type AppConfig = CompatibleAppConfig;

export interface FrameworkConfig {
  getApps?: (data?: any) => (AppConfig[] | Promise<AppConfig[]>);
  appRouter?: Omit<AppRouterProps, 'onRouteChange' | 'onAppEnter' | 'onAppLeave'>;
  layout?: ComponentType<any>;
  AppRoute?: typeof AppRoute;
}

export interface LifecycleOptions {
  container: Element;
  customProps?: Record<string, any>;
}

export interface ChildConfig {
  mount?: (options?: LifecycleOptions) => Promise<void> | void;
  unmount?: (options?: LifecycleOptions) => Promise<void> | void;
  // Just for qiankun lifecycle, not used in icestark.
  bootstrap?: (options?: any) => Promise<void> | void;
}

export function defineFrameworkConfig(config: FrameworkConfig | (() => FrameworkConfig)) {
  return typeof config === 'function' ? config() : config;
}

export function defineChildConfig(config: ChildConfig | (() => ChildConfig)) {
  return typeof config === 'function' ? config() : config;
}