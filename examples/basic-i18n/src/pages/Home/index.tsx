import { useLocale, getAllLocales, getDefaultLocale, Link, getLocale } from 'ice';
import { FormattedMessage } from 'react-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';

function Home() {
  const [locale] = useLocale();
  const allLocales = getAllLocales();
  const defaultLocale = getDefaultLocale();
  return (
    <div>
      <h2><FormattedMessage id="homeTitle" /></h2>
      <div><FormattedMessage id="configuredLocales" />: {JSON.stringify(allLocales)}</div>
      <div><FormattedMessage id="defaultLocale" />: {defaultLocale}</div>
      <div><FormattedMessage id="currentLocale" />: {locale}</div>
      <Link to="/about">About</Link>
      <LocaleSwitcher />
    </div>
  );
}

Home.getInitialProps = function () {
  console.log('getLocale in getInitialProps', getLocale());
};

export default Home;
