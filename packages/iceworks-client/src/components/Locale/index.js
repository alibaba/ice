/* eslint camelcase:0 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { ConfigProvider } from '@alifd/next';

// 引入 react-intl 多语言包
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

// 引入基础组件的语言包
import enUS from '@alifd/next/lib/locale/en-us';
import zhCN from '@alifd/next/lib/locale/zh-cn';

// 引入 locale 配置文件
import en_US from '../../locales/en-US';
import zh_CN from '../../locales/zh-CN';

// 设置语言包
addLocaleData([...en, ...zh]);

const LOCAL_ZH_CN = 'zh-CN';
const LOCAL_EN_US = 'en-US';

export const localeInfos = {
  [LOCAL_ZH_CN]: {
    nextLocale: zhCN,
    appLocale: 'zh',
    appMessages: zh_CN,
    label: '中文',
  },
  [LOCAL_EN_US]: {
    nextLocale: enUS,
    appLocale: 'en',
    appMessages: en_US,
    label: 'English',
  },
};

export const LocalContext = createContext();

export const LocaleProvider = (props) => {
  const { children, locale, setLocale } = props;

  const myLocale = localeInfos[locale]
    ? localeInfos[locale]
    : localeInfos[LOCAL_ZH_CN];

  return (
    <LocalContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={myLocale.appLocale} messages={myLocale.appMessages}>
        <ConfigProvider locale={myLocale.nextLocale}>
          {React.Children.only(children)}
        </ConfigProvider>
      </IntlProvider>
    </LocalContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};
