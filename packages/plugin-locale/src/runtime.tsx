import * as React from 'react';
// @ts-ignore
import { LocaleProvider } from '$ice/locale';

export default ({ modifyRoutes, buildConfig, addProvider }) => {
  const { locale: { defaultLocale, locales } } = buildConfig;

  modifyRoutes((routes) => {
    return addRoutesByLocales(routes, locales, defaultLocale);
  });

  addProvider(Provider(defaultLocale));
};

function addRoutesByLocales(originRoutes: any[], locales: string[], defaultLocale: string) {
  const modifiedRoutes = [...originRoutes];
  // the locales which are need to add the prefix to the route(e.g.: /home -> /en-US/home).
  const prefixRouteLocales = locales.filter(locale => locale !== defaultLocale);

  originRoutes.forEach((route) => {
    const { path, redirect } = route;
    if(path && !redirect && typeof path === 'string') {
      prefixRouteLocales.forEach((prefixRouteLocale: string) => {
        modifiedRoutes.unshift({ 
          ...route, 
          path: `/${prefixRouteLocale}${path[0] === '/' ? path :`/${path}`}`,
        });
      });
    }
  });

  return modifiedRoutes;
}

function Provider(defaultLocale: string) {
  return function({ children }) {
    return <LocaleProvider value={defaultLocale}>{children}</LocaleProvider>;
  };
}