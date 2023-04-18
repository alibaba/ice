import type { History, To } from '@remix-run/router';
import urlJoin from 'url-join';
import detectLocale from '../utils/detectLocale.js';
import normalizeLocalePath from '../utils/normalizeLocalePath.js';
import type { I18nConfig } from '../types.js';

/**
 * Hijack history in order to add locale prefix to the new route path.
 */
export default function hijackHistory(
  history: History,
  i18nConfig: I18nConfig,
  disableCookie: boolean,
  basename?: string,
) {
  const originHistory = { ...history };
  const { defaultLocale, locales } = i18nConfig;

  function createNewNavigate(type: 'push' | 'replace') {
    return function (toPath: To, state?: Record<string, any>) {
      const locale = state?.locale;
      const localePrefixPathname = getLocalePrefixPathname({
        toPath,
        basename,
        locales,
        currentLocale: locale,
        defaultLocale,
        disableCookie,
      });
      originHistory[type](localePrefixPathname, state);
    };
  }

  history.push = createNewNavigate('push');

  history.replace = createNewNavigate('replace');
}

function getLocalePrefixPathname({
  toPath,
  locales,
  defaultLocale,
  basename,
  disableCookie,
  currentLocale = '',
}: {
  toPath: To;
  locales: string[];
  defaultLocale: string;
    disableCookie: boolean;
  currentLocale: string;
  basename?: string;
}) {
  const pathname = getPathname(toPath);
  const locale = disableCookie ? currentLocale : detectLocale({
    locales,
    defaultLocale,
    pathname,
    disableCookie,
  });
  const { pathname: newPathname } = normalizeLocalePath({ pathname, locales, basename });
  return urlJoin(
    basename,
    locale === defaultLocale ? '' : locale,
    newPathname,
    typeof toPath === 'string' ? '' : toPath.search,
  );
}

function getPathname(toPath: To): string {
  if (isPathnameString(toPath)) {
    return toPath;
  }
  return toPath.pathname;
}

function isPathnameString(pathname: To): pathname is string {
  return typeof pathname === 'string';
}
