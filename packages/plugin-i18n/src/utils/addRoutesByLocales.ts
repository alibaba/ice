import { I18nConfig } from '../types';

/**
 * 在开启国际化语言后，添加国际化路由
 * 
 * 比如：locales: ['en-US', 'zh-CN', 'en-UK'], defaultLocale: 'zh-CN' 
 * /home 路由会生成 /en-US/home /en-UK/home
 */
function addRoutesByLocales(originRoutes: any[], i18nConfig: I18nConfig) {
  const { locales } = i18nConfig;
  if (!locales.length) {
    return originRoutes;
  }

  const modifiedRoutes = [...originRoutes];

  locales.forEach((prefixRouteLocale: string) => {
    function addRoutesByLocale(routes) {
      const result = routes.map((route) => {
        // path 设置默认值为空字符串是为了适配 NoMatch(NotFound) 组件
        // example: https://v5.reactrouter.com/web/example/no-match
        const { children, path = '' } = route;
        if (!children) {
          return {
            ...route,
            path: `/${prefixRouteLocale}${path === '/' ? '' : `${path[0] === '/' ? '' : '/'}${path}`}`,
          };
        } else {
          return {
            ...route,
            path: `/${prefixRouteLocale}${path === '/' ? '' : `${path[0] === '/' ? '' : '/'}${path}`}`,
            children: addRoutesByLocale(children),
          };
        }
      });

      return result;
    }

    modifiedRoutes.unshift(...addRoutesByLocale(originRoutes));
  });

  return modifiedRoutes;
}

export default addRoutesByLocales;