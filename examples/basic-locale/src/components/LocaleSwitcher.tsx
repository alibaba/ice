import { FormattedMessage } from 'react-intl';
import { useLocale, getAllLocales } from 'ice';

export default function LocaleSwitcher() {
  const [activeLocale, setLocale] = useLocale();
  const allLocales = getAllLocales();
  console.log('activeLocale==>', activeLocale);
  const otherLocales = allLocales.filter((locale) => activeLocale !== locale);
  return (
    <div>
      <p><FormattedMessage id="localeSwitcher" />:</p>
      <ul>
        {
          otherLocales.map((locale: string) => {
            return (
              <li key={locale}>
                {/* <Link to="/en-US">{locale}</Link> */}
                <div onClick={() => setLocale(locale)}>{locale}</div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
