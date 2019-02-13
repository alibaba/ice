/* eslint camelcase:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createHashHistory } from 'history';
import { IntlProvider, addLocaleData } from 'react-intl';

// 引入默认全局样式
import '@alifd/next/reset.scss';

// 引入 react-intl 多语言包
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

// 引入 locale 配置文件
import en_US from './locales/en-US';
import zh_CN from './locales/zh-CN';

// 引入基础配置文件
import router from './router';
import configureStore from './configureStore';
import { getLocale } from './utils/locale';

// 设置语言包
addLocaleData([...en, ...zh]);

const lang = getLocale();

let locale;
let messages;
if (lang === 'zh-CN') {
  locale = 'zh';
  messages = zh_CN;
} else if (lang === 'en-US') {
  locale = 'en';
  messages = en_US;
}

// 设置 redux store
const initialState = {};
const history = createHashHistory();
const store = configureStore(initialState, history);
const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <IntlProvider locale={locale} key={locale} messages={messages}>
    <Provider store={store}>
      <ConnectedRouter history={history}>{router()}</ConnectedRouter>
    </Provider>
  </IntlProvider>,
  ICE_CONTAINER
);
