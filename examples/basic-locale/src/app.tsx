import { runApp, IAppConfig, useLocale } from 'ice';
import { IntlProvider } from 'react-intl';
import { messages } from './locales';

const appConfig: IAppConfig = {
  router: {
    type: 'browser'
  },
  app: {
    addProvider: ({ children }) => {
      // TODO: use the useLocale from ice
      const locale = 'en-US';
      const defaultLocale = 'zh-CN';
      // const [locale] = getLocale();
      return (
        <IntlProvider messages={messages[locale]} locale={locale}>
          {children}
        </IntlProvider>
      );
    }
  }
};

runApp(appConfig);