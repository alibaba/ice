import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Beforeunload from 'react-beforeunload';
import '@alifd/next/reset.scss';

import logger from '@utils/logger';
import socket from '@src/socket';
import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/Locale';
import ThemeProvider from '@components/ThemeProvider';
import './global.scss';
import './variables.scss';

const history = createBrowserHistory();
const DEFAULT_LOCALE = 'zh-CN';
const DEFAULT_THEME = 'dark';

const App = () => {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [theme, setTheme] = useState(DEFAULT_THEME);

  async function getLocale() {
    const currentLocale = await socket.emit('home.setting.getLocale');
    logger.info('App locale:', currentLocale);
    setLocale(currentLocale);
  }

  async function getTheme() {
    const currentTheme = await socket.emit('home.setting.getTheme');
    logger.info('App theme:', theme);
    setTheme(currentTheme);
  }

  useEffect(() => {
    logger.info('App loaded.');
    (async () => {
      await getLocale();
      await getTheme();
    })();
  }, []);

  return (
    <Beforeunload onBeforeunload={() => "You'll loose your data"}>
      <LocaleProvider locale={locale} setLocale={setLocale}>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <Router history={history}>
            <Route path="/" component={MainLayout} />
          </Router>
        </ThemeProvider>
      </LocaleProvider>
    </Beforeunload>
  );
};

ReactDOM.render(<App />, document.getElementById('iceworks'));
