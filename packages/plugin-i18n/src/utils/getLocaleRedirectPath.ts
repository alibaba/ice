import urlJoin from 'url-join';
import type { I18nConfig } from '../types.js';
import removeBasenameFromPath from './removeBasenameFromPath.js';

interface GetRedirectPathOptions {
  pathname: string;
  defaultLocale: I18nConfig['defaultLocale'];
  detectedLocale: string;
  basename?: string;
}

export default function getLocaleRedirectPath({
  pathname,
  defaultLocale,
  detectedLocale,
  basename,
}: GetRedirectPathOptions) {
  const normalizedPathname = removeBasenameFromPath(pathname, basename);
  const isRootPath = normalizedPathname === '/';

  if (isRootPath && defaultLocale !== detectedLocale) {
    return urlJoin(basename, detectedLocale);
  }
}
