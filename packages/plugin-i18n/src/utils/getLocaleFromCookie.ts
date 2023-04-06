import type { I18nConfig } from 'src/types.js';
import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_NAME } from '../constants.js';

export default function getLocaleFromCookie(
  locales: I18nConfig['locales'],
  headers: { [key: string]: string | string[] | undefined } = {},
) {
  const cookies: Cookies = new Cookies(import.meta.renderer === 'server' ? headers.cookie : undefined);
  const iceLocale = cookies.get(LOCALE_COOKIE_NAME);
  const locale = locales.find(locale => iceLocale === locale) || undefined;

  return locale;
}