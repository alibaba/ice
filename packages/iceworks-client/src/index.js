import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/LocaleProvider';
import { ThemeProvider } from '@components/ThemeProvider';
import { getLocale } from '@utils/locale';
import { store, StoreContext } from '@src/store';

import '@utils/logger';
import '@alifd/next/reset.scss';
import './global.scss';
import './variables.scss';

const locale = getLocale();
const ICE_CONTAINER = document.getElementById('iceworks');

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <Router>
          <Route path="/" component={MainLayout} />
        </Router>
      </ThemeProvider>
    </LocaleProvider>
  </StoreContext.Provider>,
  ICE_CONTAINER
);
