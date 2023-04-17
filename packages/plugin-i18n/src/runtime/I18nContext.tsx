import type { ReactElement, SetStateAction, Dispatch } from 'react';
import React, { createContext, useState, useContext } from 'react';
import normalizeLocalePath from '../utils/normalizeLocalePath.js';
import setLocaleToCookie from '../utils/setLocaleToCookie.js';
import type { I18nConfig } from '../types.js';

type ContextValue = [string, Dispatch<SetStateAction<string>>];

interface I18nProvider {
  children: ReactElement;
  locales: I18nConfig['locales'];
  defaultLocale: I18nConfig['defaultLocale'];
  pathname: string;
  disabledCookie: boolean;
  basename?: string;
  headers?: {
    [key: string]: string | string[];
  };
}

export const I18nContext = createContext<ContextValue>(null);

I18nContext.displayName = 'I18nContext';

export function I18nProvider({
  children,
  locales,
  defaultLocale,
  disabledCookie,
  pathname,
  basename,
}: I18nProvider) {
  const [locale, updateLocale] = useState<string>(
    normalizeLocalePath({ pathname, basename, locales: locales }).pathLocale || defaultLocale,
  );

  function setLocale(locale: string) {
    !disabledCookie && setLocaleToCookie(locale);
    updateLocale(locale);
  }

  return (
    <I18nContext.Provider value={[locale, setLocale]}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  return useContext(I18nContext);
}

export function withLocale<Props>(Component: React.ComponentType<Props>) {
  return (props: Props) => {
    const [locale, setLocale] = useLocale();
    return <Component {...props} locale={locale} setLocale={setLocale} />;
  };
}
