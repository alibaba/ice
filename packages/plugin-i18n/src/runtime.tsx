import * as React from 'react';
import { History } from 'history';
import Cookies from 'universal-cookie';
import { I18nProvider, getLocaleFromCookies, getLocale } from '$ice/i18n';
import { DEFAULT_COOKIE_OPTIONS, LOCALE_COOKIE_KEY } from './constants';
import getLocaleData from './utils/getLocaleData';
import { I18nConfig, I18nAppConfig } from './types';
import normalizeLocalePath from './utils/normalizeLocalePath';
import addRoutesByLocales from './utils/addRoutesByLocales';
import getRedirectIndexRoute from './utils/getRedirectIndexRoute';

export default ({ modifyRoutes, buildConfig, addProvider, appConfig }) => {
  const { i18n: i18nConfig } = buildConfig;
  const { i18nRouting, autoRedirect, cookieOptions = DEFAULT_COOKIE_OPTIONS } = i18nConfig;
  const { router: appConfigRouter = {}, i18n: i18nAppConfig = {} } = appConfig;
  const { blockCookie = false } = i18nAppConfig;
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
    const cookieBlocked = typeof blockCookie === 'function' ? blockCookie() : blockCookie;
    setInitICELocaleToCookie(detectedLocale, cookieBlocked, cookieOptions);
  }

  if (i18nRouting !== false) {
    modifyHistory(history, i18nConfig, i18nAppConfig, basename);
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

function setInitICELocaleToCookie(locale: string, cookieBlocked: boolean, cookieOptions: I18nConfig['cookieOptions']) {
  const cookies = new Cookies();
  if (!cookieBlocked) {
    cookies.set(LOCALE_COOKIE_KEY, locale, { path: '/', ...cookieOptions });
  }
}

function modifyHistory(history: History, i18nConfig: I18nConfig, i18nAppConfig: I18nAppConfig, basename?: string) {
  const originHistory = { ...history };
  const { defaultLocale } = i18nConfig;
  const { blockCookie = false } = i18nAppConfig;
  const cookieBlocked = typeof blockCookie === 'function' ? blockCookie() : blockCookie;

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

  history.push = function(path: string | Location, state?: unknown, localeParam?: string) {
    const locale = localeParam || (cookieBlocked ? getLocale() : getLocaleFromCookies()) || defaultLocale;
    const pathname = getPathname(path);
    const localePath = getLocalePath(pathname, locale);
    originHistory.push(localePath, state);
  };

  history.replace = function(path: string | Location, state?: unknown, localeParam?: string) {
    const locale = localeParam || (cookieBlocked ? getLocale() : getLocaleFromCookies()) || defaultLocale;
    const pathname = getPathname(path);
    const localePath = getLocalePath(pathname, locale);
    originHistory.replace(localePath, state);
  };
}

function isLocationObject(path: Location | string): path is Location {
  return typeof path === 'object';
}