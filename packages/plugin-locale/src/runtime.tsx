import * as React from 'react';
import Cookies from 'universal-cookie';
import { LocaleProvider } from '$ice/locale';
import { LOCALE_COOKIE_KEY } from './constants';
import { getLocaleData } from './getLocaleData';

export default ({ modifyRoutes, buildConfig, addProvider, appConfig }) => {
  const { locale: localeConfig } = buildConfig;
  const { defaultLocale, locales, localeRoute } = localeConfig;
  const { router: appConfigRouter = {} } = appConfig;
  const { history } = appConfigRouter;

  if (localeRoute !== false) {
    modifyRoutes((routes) => {
      return addRoutesByLocales(routes, locales, defaultLocale);
    });
  }

  addProvider(Provider(defaultLocale));

  if (!process.env.__IS_SERVER__) {
    const { redirectUrl, detectedLocale } = getLocaleData({ url: window.location, localeConfig });
    setInitICELocaleToCookie(detectedLocale);
    if (redirectUrl) {
      console.log(`[icejs locale plugin]: redirect to ${redirectUrl}`);
      history.push(redirectUrl);
    }
  }
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
    return (
      <LocaleProvider value={defaultLocale}>
        {children}
      </LocaleProvider>
    );
  };
}

// function getDetectedLocale(localeConfig: LocaleConfig) {
//   const detectedLocale = getLocaleFromCookie(localeConfig) ||
//     getAcceptPreferredLocale(localeConfig) ||
//     localeConfig.defaultLocale;

//   return detectedLocale;
// }

// function getLocaleFromCookie(localConfig: LocaleConfig) {
//   const cookies = new Cookies();
//   const iceLocale = cookies.get(LOCALE_COOKIE_KEY);
  
//   return iceLocale
//     ? localConfig.locales.find(locale => iceLocale === locale)
//     : undefined;
// }

// function getAcceptPreferredLocale(localConfig: LocaleConfig) {
//   const acceptLanguages = window.navigator.languages;

//   return acceptLanguages.find(acceptLanguage => localConfig.locales.includes(acceptLanguage));
// }

// function getRedirectUrl(defaultLocale: string, detectedLocale: string) {
//   const { pathname, search } = window.location;
//   const isRootPath = pathname === '/';
//   if (isRootPath && defaultLocale !== detectedLocale) {
//     return `${pathname}${detectedLocale}${search}`;
//   }

//   return undefined;
// }

function setInitICELocaleToCookie(locale: string) {
  const cookies = new Cookies();
  const iceLocale = cookies.get(LOCALE_COOKIE_KEY);
  if (!iceLocale) {
    cookies.set(LOCALE_COOKIE_KEY, locale);
  }
}