import * as React from 'react';
import { History } from 'history';
import Cookies from 'universal-cookie';
import { LocaleProvider, getLocale } from '$ice/locale';
import { LOCALE_COOKIE_KEY } from './constants';
import { getLocaleData } from './utils/getLocaleData';
import { LocaleConfig } from './types';
import normalizeLocalePath from './utils/normalizeLocalePath';

export default ({ modifyRoutes, buildConfig, addProvider, appConfig }) => {
  const { locale: localeConfig } = buildConfig;
  const { defaultLocale, locales, localeRoute } = localeConfig;
  const { router: appConfigRouter = {} } = appConfig;
  const { history } = appConfigRouter;
  const originHistory = { ...history };

  if (localeRoute !== false) {
    modifyRoutes((routes) => {
      return addRoutesByLocales(routes, locales, defaultLocale);
    });
  }

  addProvider(Provider());

  if (!process.env.__IS_SERVER__) {
    // CSR redirect to new locale path
    const { redirectUrl, detectedLocale } = getLocaleData({ url: window.location, localeConfig });
    setInitICELocaleToCookie(detectedLocale);
    if (redirectUrl) {
      console.log(`[icejs locale plugin]: redirect to ${redirectUrl}`);
      originHistory.push(redirectUrl);
    }
  }

  modifyHistory(history, localeConfig);
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
  const { localeRoute, defaultLocale } = localeConfig;

  if (localeRoute === false) {
    return;
  }

  function getLocalePath(
    pathname: string, 
    locale: string,
  ) {
    const localePathResult = normalizeLocalePath(pathname, localeConfig);
    if (locale === defaultLocale) {
      return localePathResult.pathname;
    }
    return `/${locale}${localePathResult.pathname}`;
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