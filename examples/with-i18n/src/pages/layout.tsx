import { Outlet } from 'ice';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '@/locales';

export default function Layout() {
  const [locale, setLocale] = useState('en');

  function changeLocale(value: string) {
    setLocale(value);
  }
  return (
    <main>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Outlet />
      </IntlProvider>
    </main>
  );
}

