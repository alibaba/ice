import * as React from 'react';
import { History } from 'history';
import Cookies from 'universal-cookie';
import { I18nProvider, getLocaleFromCookies } from '$ice/i18n';
import { LOCALE_COOKIE_KEY } from './constants';
import getLocaleData from './utils/getLocaleData';
import { I18nConfig } from './types';
import normalizeLocalePath from './utils/normalizeLocalePath';
import addRoutesByLocales from './utils/addRoutesByLocales';
import getRedirectIndexRoute from './utils/getRedirectIndexRoute';

export default ({ modifyRoutes, buildConfig, addProvider, appConfig }) => {
  const { i18n: i18nConfig } = buildConfig;
  const { i18nRouting, autoRedirect } = i18nConfig;
  const { router: appConfigRouter = {} } = appConfig;
  const { history = {}, basename } = appConfigRouter;

  if (i18nRouting !== false) {
    modifyRoutes((routes) => {
      // routes 值是被 formatRoutes 方法处理后返回的结果  
      const modifiedRoutes = addRoutesByLocales(routes, i18nConfig);

      if (autoRedirect === true) {
        const newIndexComponent = getRedirectIndexRoute(modifiedRoutes, i18nConfig, basename);
        if (newIndexComponent) {
          modifiedRoutes.unshift(newIndexComponent);
        }
      }
      if (process.env.NODE_ENV !== 'production') {
        console.log('[build-plugin-ice-i18n] originRoutes: ', routes);
        console.log('[build-plugin-ice-i18n] modifiedRoutes: ', modifiedRoutes);
      }
      return modifiedRoutes;
    });
  }

  addProvider(Provider());

  if (!process.env.__IS_SERVER__) {
    const { detectedLocale } = getLocaleData({ url: window.location, i18nConfig, basename });
    setInitICELocaleToCookie(detectedLocale);
  }

  if (i18nRouting !== false) {
    modifyHistory(history, i18nConfig, basename);
  }
};

function Provider() {
  return function({ children }) {
    return (
      <I18nProvider>
        {children}
      </I18nProvider>
    );
  };
}

function setInitICELocaleToCookie(locale: string) {
  const cookies = new Cookies();
  const iceLocale = cookies.get(LOCALE_COOKIE_KEY);
  if (!iceLocale) {
    cookies.set(LOCALE_COOKIE_KEY, locale);
  }
}

function modifyHistory(history: History, i18nConfig: I18nConfig, basename?: string) {
  const originHistory = { ...history };
  const { defaultLocale } = i18nConfig;

  function getLocalePath(
    originPathname: string, 
    locale: string,
  ) {
    const localePathResult = normalizeLocalePath(originPathname, i18nConfig, basename);
    const { pathname } = localePathResult;
    if (locale === defaultLocale) {
      return pathname;
    }
    return `/${locale}${pathname === '/' ? '' : pathname}`;
  }

  function getPathname(path: string | Location): string {
    if (isLocationObject(path)) {
      return path.pathname;
    }
    return path;
  }

  history.push = function(path: string | Location, state?: unknown) {
    const locale = getLocaleFromCookies() || defaultLocale;
    const pathname = getPathname(path);
    const localePath = getLocalePath(pathname, locale);
    originHistory.push(localePath, state);
  };

  history.replace = function(path: string | Location, state?: unknown) {
    const locale = getLocaleFromCookies() || defaultLocale;
    const pathname = getPathname(path);
    const localePath = getLocalePath(pathname, locale);
    originHistory.replace(localePath, state);
  };
}

function isLocationObject(path: Location | string): path is Location {
  return typeof path === 'object';
}