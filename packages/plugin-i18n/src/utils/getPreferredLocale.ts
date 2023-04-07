import { pick as acceptLanguagePick } from 'accept-language-parser';

export default function getPreferredLocale(locales: string[], headers: { [key: string]: string | string[] } = {}) {
  if (typeof window === 'undefined') {
    const acceptLanguageValue = headers?.['accept-language'] as string;
    return acceptLanguagePick(locales, acceptLanguageValue);
  } else {
    const acceptLanguages = window.navigator.languages || [];
    return acceptLanguages.find(acceptLanguage => locales.includes(acceptLanguage));
  }
}
