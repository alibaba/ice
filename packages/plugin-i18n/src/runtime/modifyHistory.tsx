import type { History } from 'history';
import urlJoin from 'url-join';
import detectLocale from '../utils/detectLocale.js';
import getLocaleFromCookie from '../utils/getLocaleFromCookie.js';
import normalizeLocalePath from '../utils/normalizeLocalePath.js';
import type { I18nConfig } from '../types.js';

export default function modifyHistory(history: History, i18nConfig: I18nConfig, basename?: string) {
  const originHistory = { ...history };
  const { defaultLocale, locales } = i18nConfig;
  // TODO: cookie blocked
  // const { blockCookie = false } = i18nAppConfig;
  // const cookieBlocked = typeof blockCookie === 'function' ? blockCookie() : blockCookie;
  const cookieBlocked = false;

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
    const locale = (cookieBlocked ? detectLocale({ i18nConfig, pathname }) : getLocaleFromCookie(i18nConfig.locales)) ||
      defaultLocale;
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
