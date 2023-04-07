import { Outlet, useLocale, getAllLocales, getDefaultLocale } from 'ice';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { messages } from '@/locales';

export default function Layout() {
  const [locale, setLocale] = useLocale();
  console.log('allLocales: ', getAllLocales());
  console.log('defaultLocale: ', getDefaultLocale());
  return (
    <main>
      <label>
        <b>Choose language: </b>
        <select
          name="language-selector"
          id="language-selector"
          value={locale}
          onChange={e => setLocale(e.target.value)}
        >
          <option value="en-US">English</option>
          <option value="zh-CN">中文</option>
        </select>
      </label>
      <ReactIntlProvider locale={locale} messages={messages[locale]}>
        <Outlet />
      </ReactIntlProvider>
    </main>
  );
}
