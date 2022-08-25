import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { I18nConfig } from '../types';
import getLocaleData from './getLocaleData';

/**
 * 在开启路由重定向时，生成根路由 Redirect 组件
 */
export default function getRedirectIndexRoute(originRoutes: any[], i18nConfig: I18nConfig, basename?: string) {
  function walkRoute(routes: any[]) {
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      const { path, children, ...rest } = route;
      if (path === '/') {
        if (children) {
          const result = walkRoute(children);
          if (result) {
            return {
              ...rest,
              path,
              exact: true,
              children: [result],
            };
          }
        } else {
          return {
            ...route,
            exact: true,
            component: (props: any) => (
              <IndexComponent
                {...props}
                i18nConfig={i18nConfig}
                basename={basename}
                OriginIndexComponent={route.component}
              />
            )
          };
        }
      }
    }
  }

  return walkRoute(originRoutes);
}

export function IndexComponent(props) {
  const { i18nConfig, basename, OriginIndexComponent, location, staticContext, ...restProps } = props;
  const { redirectUrl } = getLocaleData({ url: location, i18nConfig, basename, headers: staticContext?.req?.headers });
  return redirectUrl ? <Redirect to={redirectUrl} /> : <OriginIndexComponent {...restProps} location={location} />;
}