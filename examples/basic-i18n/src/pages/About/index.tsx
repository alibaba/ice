import { useLocale, getAllLocales, getDefaultLocale, Link } from 'ice';
import { FormattedMessage } from 'react-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';

function About() {
  const [locale] = useLocale();
  const allLocales = getAllLocales();
  const defaultLocale = getDefaultLocale();
  return (
    <div>
      <h2><FormattedMessage id="aboutTitle" /></h2>
      <div><FormattedMessage id="configuredLocales" />: {JSON.stringify(allLocales)}</div>
      <div><FormattedMessage id="defaultLocale" />: {defaultLocale}</div>
      <div><FormattedMessage id="currentLocale" />: {locale}</div>
      <Link to="/">Home</Link>
      <LocaleSwitcher />
    </div>
  );
}

export default About;
