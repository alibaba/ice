import * as React from 'react';
import { History } from 'history';
import Cookies from 'universal-cookie';
import { LocaleProvider, getLocale } from '$ice/locale';
import { LOCALE_COOKIE_KEY } from './constants';
import getLocaleData from './utils/getLocaleData';
import { LocaleConfig } from './types';
import normalizeLocalePath from './utils/normalizeLocalePath';

export default ({ modifyRoutes, buildConfig, addProvider, appConfig }) => {
  const { locale: localeConfig } = buildConfig;
  const { defaultLocale, locales, i18nRouting } = localeConfig;
  const { router: appConfigRouter = {} } = appConfig;
  const { history = {}, basename } = appConfigRouter;
  const originHistory = { ...history };

  if (i18nRouting !== false) {
    modifyRoutes((routes) => {
      // 该 routes 值是被 formatRoutes 方法处理后返回的结果
      return addRoutesByLocales(routes, locales, defaultLocale);
    });
  }

  addProvider(Provider());

  if (!process.env.__IS_SERVER__) {
    const { redirectUrl, detectedLocale } = getLocaleData({ url: window.location, localeConfig, basename });
    setInitICELocaleToCookie(detectedLocale);
    if (redirectUrl) {
      console.log(`[icejs locale plugin]: redirect to ${redirectUrl}`);
      originHistory.push(redirectUrl);
    }
  }

  if (i18nRouting !== false) {
    modifyHistory(history, localeConfig);
  }
};

function addRoutesByLocales(originRoutes: any[], locales: string[], defaultLocale: string) {
  // the locales which are need to add the prefix to the route(e.g.: /home -> /en-US/home).
  const prefixRouteLocales = locales.filter(locale => locale !== defaultLocale);

  if (!prefixRouteLocales.length) {
    return originRoutes;
  }
  const modifiedRoutes = [...originRoutes];

  prefixRouteLocales.forEach((prefixRouteLocale: string) => {
    originRoutes.forEach((originRoute) => {
      const { children, path } = originRoute;
      if (!children) {
        modifiedRoutes.unshift({
          ...originRoute,
          path: `/${prefixRouteLocale}${path[0] === '/' ? path :`/${path}`}`,
        });
      } else {
        modifiedRoutes.unshift({
          ...originRoute,
          path: `/${prefixRouteLocale}${path[0] === '/' ? path :`/${path}`}`,
          children: addRoutesByLocales(children, locales, defaultLocale),
        });
      }
    });
  });

  return modifiedRoutes;
}

function Provider() {
  return function({ children }) {
    return (
      <LocaleProvider>
        {children}
      </LocaleProvider>
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

function modifyHistory(history: History, localeConfig: LocaleConfig) {
  const originHistory = { ...history };
  const { defaultLocale } = localeConfig;

  function getLocalePath(
    pathname: string, 
    locale: string,
  ) {
    const localePathResult = normalizeLocalePath(pathname, localeConfig);
    if (locale === defaultLocale) {
      return localePathResult.pathname;
    }
    return `/${locale}${localePathResult.pathname === '/' ? '' : localePathResult.pathname}`;
  }

  history.push = function(path: string, state?: unknown) {
    const locale = getLocale();
    const localePath = getLocalePath(path, locale);
    originHistory.push(localePath, state);
  };

  history.replace = function(path: string, state?: unknown) {
    const locale = getLocale();
    const localePath = getLocalePath(path, locale);
    originHistory.replace(localePath, state);
  };
}