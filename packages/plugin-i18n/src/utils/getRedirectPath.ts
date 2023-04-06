import type { I18nConfig } from '../types.js';
import removeBasenameFromPath from './removeBasenameFromPath.js';

interface GetRedirectPathOptions {
  pathname: string;
  i18nConfig: I18nConfig;
  detectedLocale: string;
  basename?: string;
}

export default function getRedirectPath({ pathname, i18nConfig, detectedLocale, basename }: GetRedirectPathOptions) {
  const { autoRedirect, defaultLocale } = i18nConfig;
  const normalizedPathname = removeBasenameFromPath(pathname, basename);
  const isRootPath = normalizedPathname === '/';

  if (
    autoRedirect &&
    isRootPath &&
    defaultLocale !== detectedLocale
  ) {
    // TODO: the redirectPath should have the basename
    return `/${detectedLocale}`;
  }
}