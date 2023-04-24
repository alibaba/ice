import { Outlet, useLocale, getAllLocales, getDefaultLocale, Link, useLocation } from 'ice';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { messages } from '@/locales';

export default function Layout() {
  const location = useLocation();
  const [activeLocale, setLocale] = useLocale();

  return (
    <main>
      <p><b>Current locale: </b>{activeLocale}</p>
      <p><b>Default locale: </b>{getDefaultLocale()}</p>
      <p><b>Configured locales: </b>{JSON.stringify(getAllLocales())}</p>

      <b>Choose language: </b>
      <ul>
        {
          getAllLocales().map((locale: string) => {
            return (
              <li key={locale}>
                <Link
                  to={location.pathname}
                  onClick={() => setLocale(locale)}
                // state={{ locale }}
                >
                  {locale}
                </Link>
              </li>
            );
          })
        }
      </ul>
      <ReactIntlProvider locale={activeLocale} messages={messages[activeLocale]}>
        <Outlet />
      </ReactIntlProvider>
    </main>
  );
}
