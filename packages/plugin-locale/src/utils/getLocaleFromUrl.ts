import { LocaleConfig } from '../types';

function getLocaleFromUrl(localeConfig: LocaleConfig, pathname: string) {
  const subPathnames = pathname.split('/').filter((item: string) => item);
  return subPathnames[0] || localeConfig.defaultLocale;
}

export default getLocaleFromUrl;
