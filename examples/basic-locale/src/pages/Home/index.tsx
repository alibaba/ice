import { Link, useLocale, getAllLocales, getDefaultLocale } from 'ice';

function Home() {
  const [locale, setLocale] = useLocale();
  console.log('current locale: ', locale);
  const allLocales = getAllLocales();
  const defaultLocale = getDefaultLocale();

  return (
    <div>
      <h2 onClick={() => setLocale('en-US')}>Home</h2>
      <div>All Locales: {allLocales.join(', ')}</div>
      <div>Default Locale: {defaultLocale}</div>
      <Link to='/about'>About Page</Link>
    </div>
  );
}

export default Home;
