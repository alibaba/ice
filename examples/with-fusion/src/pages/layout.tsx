import { Outlet } from 'ice';
import { useState } from 'react';
import { ConfigProvider, Radio } from '@alifd/next';
import enUS from '@alifd/next/lib/locale/en-us';
import zhCN from '@alifd/next/lib/locale/zh-cn';
import { IntlProvider } from 'react-intl';
import { messages } from '@/locales';

const localeMap = new Map([
  ['en', enUS],
  ['zh-cn', zhCN],
]);

export default function Layout() {
  const [locale, setLocale] = useState('en');
  const list = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'zh-cn',
      label: '中文',
    },
  ];

  function changeLocale(value: string) {
    setLocale(value);
  }
  console.log();
  return (
    <main>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Radio.Group
          dataSource={list}
          shape="button"
          value={locale}
          onChange={changeLocale}
        />
        <ConfigProvider locale={localeMap.get(locale)}>
          <Outlet />
        </ConfigProvider>
      </IntlProvider>
    </main>
  );
}

