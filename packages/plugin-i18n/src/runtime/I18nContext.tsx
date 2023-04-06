import type { ReactElement, SetStateAction, Dispatch } from 'react';
import React, { createContext, useState, useContext } from 'react';
import type { I18nConfig } from '../types.js';
import setLocaleToCookie from '../utils/setLocaleToCookie.js';
import detectLocale from '../utils/detectLocale.js';

type ContextValue = {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  locales: I18nConfig['locales'];
  defaultLocale: I18nConfig['defaultLocale'];
};

interface I18nProvider {
  children: ReactElement;
  i18nConfig: I18nConfig;
  pathname: string;
  basename?: string;
  headers?: {
    [key: string]: string | string[];
  };
}

export const I18nContext = createContext<ContextValue>(null);

I18nContext.displayName = 'I18nContext';

export const I18nProvider = ({ children, i18nConfig, pathname, basename, headers }: I18nProvider) => {
  const [locale, updateLocale] = useState<string>(detectLocale({
    i18nConfig,
    pathname,
    basename,
    headers,
  }));

  function setLocale(locale: string) {
    setLocaleToCookie(locale);
    updateLocale(locale);
  }

  return (
    <I18nContext.Provider value={{
      locale,
      setLocale,
      locales: i18nConfig.locales,
      defaultLocale: i18nConfig.defaultLocale,
    }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useLocale() {
  return useContext(I18nContext);
}

export function withLocale<Props>(Component: React.ComponentType<Props>) {
  return (props: Props) => {
    const { locale, setLocale } = useLocale();
    return <Component {...props} locale={locale} setLocale={setLocale} />;
  };
}
