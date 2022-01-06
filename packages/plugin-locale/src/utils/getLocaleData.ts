import { pick as acceptLanguagePick } from 'accept-language-parser';
import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_KEY } from '../constants';
import { LocaleConfig } from '../types';
import getDetectedLocaleFromPathname from './getDetectedLocaleFromPathname';

interface UrlObject {
  pathname: string;
  search: string;
}

export default function getLocaleData({
  url,
  localeConfig,
  headers,
  basename,
}: {
  url: UrlObject,
  localeConfig: LocaleConfig,
  headers?: Record<string, string>,
  basename?: string,
}) {
  const { pathname } = url;
  const detectedLocale = getDetectedLocale({ pathname, headers, localeConfig });
  const redirectUrl = getRedirectUrl(url.pathname, {...localeConfig, detectedLocale }, basename);

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
      (localeConfig.i18nRouting === false ? undefined : getDetectedLocaleFromPathname(pathname, locales)) ||
      defaultLocale;

  return detectedLocale;
}

/**
 * 开启自动重定向选项时(redirect: true)时，获取下一个要跳转的 url
 * 仅在 pathname 为 `/` 时重定向
 */
function getRedirectUrl(
  pathname: string, 
  localeConfig: LocaleConfig & { detectedLocale: string },
  basename?: string,
) {
  const { redirect, defaultLocale, detectedLocale, i18nRouting } = localeConfig;
  const isRootPath = replaceBasename(pathname, basename) === '/';
  if (
    redirect === true && 
    i18nRouting !== false && 
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

function replaceBasename(pathname: string, basename?: string) {
  if (!basename) {
    return pathname;
  }
  if (pathname.startsWith(basename)) {
    return pathname.substr(basename.length);
  }
}
