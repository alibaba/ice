import { Outlet } from 'ice';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '@/locales';

export default function Layout() {
  const [locale, setLocale] = useState<string>('en');
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
          <option value="en">English</option>
          <option value="zh-cn">中文</option>
        </select>
      </label>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Outlet />
      </IntlProvider>
    </main>
  );
}

