import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Beforeunload from 'react-beforeunload';
import useTheme from '@hooks/useTheme';
import '@alifd/next/reset.scss';

import logger from '@utils/logger';
import socket from '@src/socket';
import MainLayout from '@layouts/MainLayout/index';
import { LocaleProvider } from '@components/Locale';
import ThemeProvider from '@components/ThemeProvider';
import './global.scss';
import './variables.scss';

const history = createBrowserHistory();

const App = () => {
  const [locale, setLocale] = useState();
  const [theme, setTheme] = useTheme();

  async function getLocale() {
    const currentLocale = await socket.emit('home.setting.getLocale');
    logger.info('App locale:', currentLocale);
    setLocale(currentLocale);
  }

  async function getTheme() {
    const currentTheme = await socket.emit('home.setting.getTheme');
    logger.info('App theme:', currentTheme);
    setTheme(currentTheme);
  }

  useEffect(() => {
    logger.info('App loaded.');
    (async () => {
      await getLocale();
      await getTheme();
    })();
  });

  // 防止初始化UI抖动
  if (!locale || !theme) {
    return null;
  }

  return (
    <Beforeunload onBeforeunload="">
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
