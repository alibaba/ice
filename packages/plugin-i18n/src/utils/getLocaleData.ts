import { pick as acceptLanguagePick } from 'accept-language-parser';
import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_KEY } from '../constants';
import { I18nConfig } from '../types';
import getDetectedLocaleFromPathname from './getDetectedLocaleFromPathname';
import replaceBasename from './replaceBasename';

interface UrlObject {
  pathname: string;
  search: string;
}

export default function getLocaleData({
  url,
  i18nConfig,
  headers,
  basename,
}: {
  url: UrlObject,
  i18nConfig: I18nConfig,
  headers?: Record<string, string>,
  basename?: string,
}) {
  const pathname = url.pathname || '/';
  const detectedLocale = getDetectedLocale({ pathname, headers, i18nConfig, basename });
  const redirectUrl = getRedirectUrl(pathname, { ...i18nConfig, detectedLocale }, basename);

  return {
    detectedLocale,
    redirectUrl,
  };
}

function getDetectedLocale(
  {
    pathname,
    i18nConfig,
    headers = {},
    basename,
  }: {
    pathname: string,
    i18nConfig: I18nConfig,
    headers?: Record<string, string>,
    basename?: string,
  }) {
  let cookies;
  if (typeof window === 'undefined') {
    cookies = (new Cookies(headers.cookie)).getAll();
  } else {
    cookies = (new Cookies()).getAll();
  }

  const { defaultLocale, locales, i18nRouting } = i18nConfig;

  // 检测获取Locale的优先级为：path前缀 > cookie > 浏览器语言设置 > 默认语言
  const detectedLocale =
    (i18nRouting === false ? undefined : getDetectedLocaleFromPathname({ pathname, locales, basename })) ||
    getLocaleFromCookie(locales, cookies) ||
    getPreferredLocale(locales, headers) ||
    defaultLocale;

  return detectedLocale;
}

/**
 * 开启自动重定向选项时(autoRedirect: true)时，获取下一个要跳转的 url
 * 仅在 pathname 为 `/` 或者 `/${basename}` 时重定向
 */
function getRedirectUrl(
  pathname: string,
  i18nConfig: I18nConfig & { detectedLocale: string },
  basename?: string,
) {
  const { autoRedirect, defaultLocale, detectedLocale, i18nRouting } = i18nConfig;
  const normalizedPathname = replaceBasename(pathname, basename);
  const isRootPath = normalizedPathname === '/';
  if (
    autoRedirect === true &&
    i18nRouting !== false &&
    isRootPath &&
    defaultLocale !== detectedLocale
  ) {
    return `/${detectedLocale}`;
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
    const acceptLanguages = window.navigator.languages || [];
    return acceptLanguages.find(acceptLanguage => locales.includes(acceptLanguage));
  }
}
