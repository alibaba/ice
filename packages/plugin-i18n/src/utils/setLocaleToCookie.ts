import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_NAME } from '../constants.js';

/**
 * NOTE: Call this function in browser.
 */
export default function setLocaleToCookie(locale: string) {
  const cookies = new Cookies();
  cookies.set(LOCALE_COOKIE_NAME, locale, { path: '/' });
}
