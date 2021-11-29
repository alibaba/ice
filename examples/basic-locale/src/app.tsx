import { runApp, IAppConfig } from 'ice';
import { IntlProvider } from 'react-intl';
import { messages } from './locales';

const appConfig: IAppConfig = {
  router: {
    type: 'browser'
  },
  app: {
    addProvider: ({ children }) => {
      const locale = 'en-US';
      const defaultLocale = 'zh-CN';
      return (
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={defaultLocale}>
          {children}
        </IntlProvider>
      );
    }
  }
};

runApp(appConfig);