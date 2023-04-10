import type { I18nConfig } from '../types.js';
import getLocaleFromCookie from './getLocaleFromCookie.js';
import normalizeLocalePath from './normalizeLocalePath.js';
import getPreferredLocale from './getPreferredLocale.js';

interface DetectLocaleParams {
  i18nConfig: I18nConfig;
  pathname: string;
  basename?: string;
  headers?: {
    [key: string]: string | string[];
  };
}

export default function detectLocale({
  i18nConfig,
  pathname,
  basename,
  headers = {},
}: DetectLocaleParams): string {
  const detectedLocale = (
    normalizeLocalePath({ pathname, locales: i18nConfig.locales, basename }).pathLocale ||
    getLocaleFromCookie(i18nConfig.locales, headers) ||
    getPreferredLocale(i18nConfig.locales, headers) ||
    i18nConfig.defaultLocale
  );

  return detectedLocale;
}
