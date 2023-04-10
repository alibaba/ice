import { pick as acceptLanguagePick } from 'accept-language-parser';

/**
 * Get the preferred locale by Accept-Language in request headers(Server) or window.navigator.languages(Client)
 */
export default function getPreferredLocale(locales: string[], headers: { [key: string]: string | string[] } = {}) {
  if (typeof window === 'undefined') {
    const acceptLanguageValue = headers?.['accept-language'] as string;
    return acceptLanguagePick(locales, acceptLanguageValue);
  } else {
    const acceptLanguages = window.navigator.languages || [];
    return acceptLanguages.find(acceptLanguage => locales.includes(acceptLanguage));
  }
}
