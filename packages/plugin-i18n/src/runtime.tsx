import * as React from 'react';
import { History } from 'history';
import Cookies from 'universal-cookie';
import { I18nProvider, getLocale } from '$ice/i18n';
import { LOCALE_COOKIE_KEY } from './constants';
import getLocaleData from './utils/getLocaleData';
import { I18nConfig } from './types';
import normalizeLocalePath from './utils/normalizeLocalePath';

export default ({ modifyRoutes, buildConfig, addProvider, appConfig }) => {
  const { i18n: i18nConfig } = buildConfig;
  const { defaultLocale, locales, i18nRouting } = i18nConfig;
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

  // CSR
  if (!process.env.__IS_SERVER__) {
    const { redirectUrl, detectedLocale } = getLocaleData({ url: window.location, i18nConfig, basename });
  
    setInitICELocaleToCookie(detectedLocale);
  
    if (redirectUrl) {
      console.log(`[icejs locale plugin]: redirect to ${redirectUrl}`);
      originHistory.push(redirectUrl);
    }
  }

  if (i18nRouting !== false) {
    modifyHistory(history, i18nConfig, basename);
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
    pathname: string, 
    locale: string,
  ) {
    const localePathResult = normalizeLocalePath(pathname, i18nConfig, basename);

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