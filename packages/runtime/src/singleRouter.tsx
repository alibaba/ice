/**
 * Fake API of react-router-dom, react-router-dom will be remove
 * if user config `optimize.router` false
 */
import * as React from 'react';
import type { History } from '@remix-run/router';
import type { LoaderData } from './types.js';

const Context = React.createContext<LoaderData>(undefined);

Context.displayName = 'DataContext';

export function useData<T = any>(): T {
  const value = React.useContext(Context);
  return value.data;
}

export function useConfig() {
  const value = React.useContext(Context);
  return value.pageConfig;
}

export const DataContextProvider = Context.Provider;


export const useRoutes = (routes) => {
  return <>{routes[0].element}</>;
};

export const Router = (props) => {
  return <>{props.children}</>;
};

export const createHistory = (): History => {
  return {
    // @ts-expect-error
    listen: () => {},
    // @ts-expect-error
    action: 'POP',
    // @ts-expect-error
    location: '',
  };
};

const stripString = (str: string) => {
  const regexForSlash = /^\/|\/$/g;
  return str.replace(regexForSlash, '');
};

export const matchRoutes = (routes: any[], location: Partial<Location> | string, basename: string) => {
  const stripedBasename = basename ? stripString(basename) : basename;
  const pathname = typeof location === 'string' ? location : location.pathname;
  let stripedPathname = stripString(pathname);
  if (stripedBasename) {
    stripedPathname = stripedPathname.replace(new RegExp(`^${stripedBasename}/`), '');
  }
  const route = routes.length === 1 ? routes[0] : routes.find(item => {
    return stripString(item.path || '') === stripedPathname;
  });
  if (!route) {
    throw new Error(`No route matched pathname: ${pathname}`);
  }
  return [{
    route,
    params: {},
    pathname,
    pathnameBase: '',
  }];
};

export const Link = () => null;
export const NavLink = () => null;
export const Outlet = () => {
  return <></>;
};
export const useParams = () => {
  return {};
};
export const useSearchParams = () => {
  return [{}, () => {}];
};
export const useLocation = () => {
  return {};
};
export const useNavigate = () => {
  return {};
};
export const useNavigation = () => {
  throw new Error('useNavigation is not supported in single router mode');
};

export const useRevalidator = () => {
  throw new Error('useRevalidator is not supported in single router mode');
};
