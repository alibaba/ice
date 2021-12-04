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

// function LocaleProvider({ children }) {
//   return (
//     <div>
//       This is Locale Provider
//       {children}
//     </div>
//   );
// }

function addRoutesByLocales(originRoutes: any[], locales: string[], defaultLocale: string) {
  const modifiedRoutes = [...originRoutes];
  // the locales which are need to add the prefix to the route(e.g.: /home -> /en-US/home).
  const prefixRouteLocales = locales.filter(locale => locale !== defaultLocale);

  originRoutes.forEach((route) => {
    const { path, redirect } = route;
    if (path && !redirect && typeof path === 'string') {
      prefixRouteLocales.forEach((prefixRouteLocale: string) => {
        modifiedRoutes.push({ 
          ...route, 
          path: `/${prefixRouteLocale}${path[0] === '/' ? path :`/${path}`}`,
        });
      });
    }
  });

  return modifiedRoutes;
}

function Provider(defaultLocale) {
  return function({ children }) {
    return <LocaleProvider value={defaultLocale}>212{children}</LocaleProvider>;
  };

}