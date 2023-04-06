import type { I18nConfig } from '../types.js';
import removeBasenameFromPath from './removeBasenameFromPath.js';

interface NormalizeLocalePathOptions {
  pathname: string;
  locales: I18nConfig['locales'];
  basename?: string;
}

export default function normalizeLocalePath({ pathname, locales, basename }: NormalizeLocalePathOptions) {
  const originPathname = removeBasenameFromPath(pathname, basename);
  const subPaths = originPathname.split('/');
  let newPathname = originPathname;
  let pathLocale: string | undefined;
  for (const locale of locales) {
    if (subPaths[1] && subPaths[1] === locale) {
      pathLocale = locale;
      subPaths.splice(1, 1);
      newPathname = subPaths.join('/') || '/';
      break;
    }
  }

  return {
    pathname: newPathname,
    pathLocale,
  };
}