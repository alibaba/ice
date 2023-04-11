import type { History } from 'history';
import urlJoin from 'url-join';
import detectLocale from '../utils/detectLocale.js';
import getLocaleFromCookie from '../utils/getLocaleFromCookie.js';
import normalizeLocalePath from '../utils/normalizeLocalePath.js';
import type { I18nAppConfig, I18nConfig } from '../types.js';

/**
 * Add locale prefix to the route path.
 */
export default function modifyHistory(
  history: History,
  i18nConfig: I18nConfig,
  i18nAppConfig: I18nAppConfig,
  basename?: string,
) {
  const originHistory = { ...history };
  const { defaultLocale, locales } = i18nConfig;

  const { blockCookie } = i18nAppConfig;
  const cookieBlocked = typeof blockCookie === 'function' ? blockCookie() : blockCookie;

  history.push = (path: string | Location, state?: unknown) => {
    const localePath = getLocalePath(path, basename);
    originHistory.push(localePath, state);
  };

  history.replace = (path: string | Location, state?: unknown) => {
    const localePath = getLocalePath(path, basename);
    originHistory.replace(localePath, state);
  };

  function getPathname(path: string | Location): string {
    if (isLocationObject(path)) {
      return path.pathname;
    }
    return path;
  }

  function getLocalePath(path: string | Location, basename?: string) {
    const pathname = getPathname(path);
    // TODO: cookie blocked
    const locale = (
      cookieBlocked
        ? detectLocale({ locales, defaultLocale, pathname })
        : getLocaleFromCookie(locales)
    ) || defaultLocale;
    const { pathname: newPathname } = normalizeLocalePath({ pathname, locales, basename });

    return urlJoin(
      basename,
      locale === defaultLocale ? '' : locale,
      newPathname,
    );
  }
}

function isLocationObject(path: Location | string): path is Location {
  return typeof path === 'object';
}
