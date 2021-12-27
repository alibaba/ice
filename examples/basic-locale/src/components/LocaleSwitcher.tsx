import { FormattedMessage } from 'react-intl';
import { useLocale, getAllLocales, Link, useLocation } from 'ice';

export default function LocaleSwitcher() {
  const location = useLocation();

  const [activeLocale, setLocale] = useLocale();
  const allLocales = getAllLocales();
  console.log('activeLocale==>', activeLocale, 'location.pathname', location.pathname);
  const otherLocales = allLocales.filter((locale) => activeLocale !== locale);
  return (
    <div>
      <p><FormattedMessage id="localeSwitcher" />:</p>
      <ul>
        {
          otherLocales.map((locale: string) => {
            return (
              <li key={locale}>
                {/* <Link to="/" onClick={() => setLocale(locale)}>{locale}</Link> */}
                <Link to={location.pathname} onClick={() => setLocale(locale)}>{locale}</Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
