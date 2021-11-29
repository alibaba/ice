export default ({ modifyRoutes, buildConfig }) => {
  const { locale: { defaultLocale, locales } } = buildConfig;

  modifyRoutes((routes) => {
    console.log('addRoutesByLocales(routes, locales, defaultLocale)', addRoutesByLocales(routes, locales, defaultLocale));
    return addRoutesByLocales(routes, locales, defaultLocale);
    return routes;
  });
};

function addRoutesByLocales(originRoutes: any[], locales: string[], defaultLocale: string) {
  const modifiedRoutes = [...originRoutes];
  const prefixRouteLocales = locales.filter(locale => locale !== defaultLocale);

  originRoutes.forEach((route) => {
    const { path, redirect } = route;
    if (path && !redirect && typeof path === 'string') {
      prefixRouteLocales.forEach((prefixRouteLocale: string) => {
        modifiedRoutes.unshift({ ...route, path: `/${prefixRouteLocale}` });
      });
    }
  });

  return modifiedRoutes;
}