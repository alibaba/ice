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

export const matchRoutes = (routes: any[]) => {
  return routes.map(item => {
    return {
      params: {},
      pathname: '',
      pathnameBase: '',
      route: item,
    };
  });
};

export const Link = () => null;
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
