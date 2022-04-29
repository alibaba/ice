/**
 * 对 react-router-dom 进行二次封装，保证只有一个路由时能够通过 tree-shaking 将 react-router 相关代码全量移除
 */
import * as React from 'react';
import type { History } from 'history';

export const useRoutesSingle = (routes) => {
  return <>{routes[0].element}</>;
};

export const RouterSingle = (props) => {
  return <>{props.children}</>;
};

export const createHistorySingle = (): History => {
  return {
    // @ts-expect-error
    listen: () => {},
    // @ts-expect-error
    action: 'POP',
    // @ts-expect-error
    location: '',
  };
};

export const matchRoutesSingle = (routes) => {
  return routes.map(item => {
    return {
      params: {},
      pathname: '',
      pathnameBase: '',
      route: item,
    };
  });
};

export const LinkSingle = () => null;
export const OutletSingle = () => {
  return <></>;
};
export const useParamsSingle = () => {
  return {};
};
export const useSearchParamsSingle = () => {
  return [{}, () => {}];
};
