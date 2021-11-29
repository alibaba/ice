import * as React from 'react';

export default ({ modifyRoutes, buildConfig, addProvider }) => {
  const { locale: { defaultLocale, locales } } = buildConfig;

  modifyRoutes((routes) => {
    return addRoutesByLocales(routes, locales, defaultLocale);
  });

  addProvider(LocaleProvider);
};

function LocaleProvider({ children }) {
  return (
    <div>
      This is Locale Provider
      {children}
    </div>
  );
}

function addRoutesByLocales(originRoutes: any[], locales: string[], defaultLocale: string) {
  const modifiedRoutes = [...originRoutes];
  const prefixRouteLocales = locales.filter(locale => locale !== defaultLocale);

  originRoutes.forEach((route) => {
    const { path, redirect } = route;
    if (path && !redirect && typeof path === 'string') {
      prefixRouteLocales.forEach((prefixRouteLocale: string) => {
        modifiedRoutes.push({ ...route, path: `/${prefixRouteLocale}${path[0] === '/' ? path :`/${path}`}` });
      });
    }
  });

  return modifiedRoutes;
}