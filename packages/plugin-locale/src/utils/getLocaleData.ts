import { pick as acceptLanguagePick } from 'accept-language-parser';
import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_KEY } from '../constants';
import { LocaleConfig } from '../types';

interface UrlObject {
  pathname: string;
  search: string;
}

export function getLocaleData({
  url,
  localeConfig,
  headers
}: {
  url: UrlObject,
  localeConfig: LocaleConfig,
  headers?: Record<string, string>,
}) {
  const { pathname } = url;
  const detectedLocale = getDetectedLocale({ pathname, headers, localeConfig });
  const redirectUrl = getRedirectUrl(url.pathname, {...localeConfig, detectedLocale });

  return {
    detectedLocale,
    redirectUrl,
  };
}

function getDetectedLocale(
  { 
    pathname, 
    localeConfig,
    headers,
  }: { 
    pathname: string, 
    localeConfig: LocaleConfig,
    headers?: Record<string, string>
  }) {
  let cookies;
  if (typeof window === 'undefined') {
    cookies = (new Cookies(headers.cookie)).getAll();
  } else {
    cookies = (new Cookies()).getAll();
  }
  
  const { defaultLocale, locales } = localeConfig;

  const detectedLocale = 
      getLocaleFromCookie(locales, cookies) || 
      getPreferredLocale(locales, headers) || 
      (localeConfig.localeRoute === false ? undefined : getDetectedLocaleFromPath(pathname, locales)) ||
      defaultLocale;

  return detectedLocale;
}

/**
 * 开启自动重定向选项时(localeRedirect: true)时，获取下一个要跳转的 url
 * 仅在 pathname 为 `/` 时重定向
 */
function getRedirectUrl(
  pathname: string, 
  localeConfig: LocaleConfig & { detectedLocale: string },
) {
  const { localeRedirect, defaultLocale, detectedLocale, localeRoute } = localeConfig;
  const isRootPath = pathname === '/';
  if (
    localeRedirect === true && 
    localeRoute !== false && 
    isRootPath && 
    defaultLocale !== detectedLocale
  ) {
    return `${pathname}${detectedLocale}`;
  }
}

function getLocaleFromCookie(locales: string[], cookies: Record<string, string>) {
  const iceLocale = cookies[LOCALE_COOKIE_KEY];

  return locales.find(locale => iceLocale === locale);
}

function getPreferredLocale(locales: string[], headers?: { [key: string]: string }) {
  if (typeof window === 'undefined') {
    const acceptLanguageValue = headers?.['accept-language'];
    return acceptLanguagePick(locales, acceptLanguageValue);
  } else {
    const acceptLanguages = window.navigator.languages;
    return acceptLanguages.find(acceptLanguage => locales.includes(acceptLanguage));
  }
}

/**
 * 开启国际化路由时，通过 pathname 获取当前语言
 */
function getDetectedLocaleFromPath(pathname: string, locales: string[]) {
  const pathnameParts = pathname.split('/').filter(pathnamePart => pathnamePart);

  let detectedLocale: string | undefined;

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of locales) {
    if (pathnameParts[0] === locale) {
      detectedLocale = locale;
      break;
    }
  }

  return detectedLocale;
}