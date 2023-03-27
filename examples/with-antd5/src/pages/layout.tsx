import { Outlet } from 'ice';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import type { Locale } from 'antd/es/locale';
import { FormattedMessage } from 'react-intl';

import * as dayjs from 'dayjs';
import { messages } from '@/locales';
import 'dayjs/locale/zh-cn';

export default function Layout() {
  const [locale, setLocale] = useState<Locale>(enUS);

  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    setLocale(localeValue);
    if (!localeValue) {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  };

  return (
    <main>
      <IntlProvider locale={locale.locale} messages={messages[locale.locale]}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 16 }}><FormattedMessage id="changeLanguageTitle" /></span>
          <Radio.Group value={locale} onChange={changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
        </div>
        <ConfigProvider locale={locale}>
          <Outlet />
        </ConfigProvider>
      </IntlProvider>
    </main>
  );
}
