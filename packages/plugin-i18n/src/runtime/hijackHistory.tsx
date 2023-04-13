import type { History, To } from 'history';
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
  disabledCookie: boolean,
  basename?: string,
) {
  const originHistory = { ...history };
  const { defaultLocale, locales } = i18nConfig;

  function navigate(toPath: To, state?: Record<string, any>) {
    const locale = state?.locale;
    const localePrefixPathname = getLocalePrefixPathname({
      toPath,
      basename,
      locales,
      currentLocale: locale,
      defaultLocale,
      disabledCookie,
    });
    originHistory.push(localePrefixPathname, state);
  }

  history.push = navigate;

  history.replace = navigate;
}

function getLocalePrefixPathname({
  toPath,
  locales,
  defaultLocale,
  basename,
  disabledCookie,
  currentLocale = '',
}: {
  toPath: To;
  locales: string[];
  defaultLocale: string;
  disabledCookie: boolean;
  currentLocale: string;
  basename?: string;
}) {
  const pathname = getPathname(toPath);
  const locale = disabledCookie ? currentLocale : detectLocale({
    locales,
    defaultLocale,
    pathname,
    disabledCookie,
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
