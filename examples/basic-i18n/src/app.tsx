import { runApp, IAppConfig, useLocale, getDefaultLocale, setLocale } from 'ice';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { messages } from './locales';

function IntlProvider({ children }) {
  const [locale] = useLocale();
  const defaultLocale = getDefaultLocale();

  return (
    <ReactIntlProvider 
      messages={messages[locale]} 
      locale={locale}
      defaultLocale={defaultLocale}
    >
      {children}
    </ReactIntlProvider>
  );
}

const appConfig: IAppConfig = {
  router: {
    type: 'browser',
    basename: '/ice'
  },
  app: {
    addProvider: ({ children }) => {
      return (
        <IntlProvider>{children}</IntlProvider>
      );
    },
    async getInitialData() {
      setLocale('zh-CN');
    }
  }
};

runApp(appConfig);