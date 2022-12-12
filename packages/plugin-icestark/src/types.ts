import type { ComponentType } from 'react';
import type { CompatibleAppConfig } from '@ice/stark/lib/AppRoute';
import type { AppRouterProps } from '@ice/stark/lib/AppRouter';

export interface RouteInfo {
  pathname?: string;
  query?: Record<string, string>;
  hash?: string;
  routeType?: string;
}

export type FrameworkComponent = ComponentType<RouteInfo>;

export type AppConfig = CompatibleAppConfig;

export interface FrameworkConfig {
  getApps?: (data?: any) => (AppConfig[] | Promise<AppConfig[]>);
  appRouter?: Omit<AppRouterProps, 'onRouteChange' | 'onAppEnter' | 'onAppLeave'>;
  layout?: ComponentType<any>;
}

export interface LifecycleOptions {
  container: Element;
  customProps?: Record<string, any>;
}

export interface ChildConfig {
  mount?: (options?: LifecycleOptions) => void;
  unmount?: (options?: LifecycleOptions) => void;
}

export function defineFrameworkConfig(config: FrameworkConfig | (() => FrameworkConfig)) {
  return typeof config === 'function' ? config() : config;
}

export function defineChildConfig(config: ChildConfig | (() => ChildConfig)) {
  return typeof config === 'function' ? config() : config;
}