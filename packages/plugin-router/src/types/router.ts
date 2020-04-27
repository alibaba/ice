import { History } from 'history';
import { IgnoreOptions } from './collector';
import { IRouterConfig } from '.';
import { RouteItemProps } from './base';

export interface RouterProps {
  routes: RouteItemProps[];
  type?: 'hash' | 'browser' | 'memory' | 'static';
  // common props for BrowserRouter & HashRouter & MemoryRouter
  basename?: string;
  getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
  forceRefresh?: boolean;
  // for BrowserRouter
  keyLength?: number;
  // for HashRouter
  hashType?: 'slash' | 'noslash' | 'hashbang';
  // for MemoryRouter
  initialEntries?: string[];
  initialIndex?: number;
  fallback?: React.ReactNode;
  history: History;
};

export interface RoutesProps {
  routes: IRouterConfig[];
  fallback?: React.ReactNode;
};

export interface IRouterOptions {
  caseSensitive?: boolean;
  ignoreRoutes?: IgnoreOptions;
  ignorePaths?: IgnoreOptions;
  configPath?: string;
  lazy?: boolean;
}