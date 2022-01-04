import { runApp, IAppConfig, useLocale, getDefaultLocale } from 'ice';
import { IntlProvider } from 'react-intl';
import { messages } from './locales';

function LocaleProvider({ children }) {
  const [locale] = useLocale();
  const defaultLocale = getDefaultLocale();

  return (
    <IntlProvider 
      messages={messages[locale]} 
      locale={locale}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
}

const appConfig: IAppConfig = {
  router: {
    type: 'browser'
  },
  app: {
    addProvider: ({ children }) => {
      return (
        <LocaleProvider>{children}</LocaleProvider>
      );
    }
  }
};

runApp(appConfig);