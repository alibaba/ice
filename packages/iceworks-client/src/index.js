import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@alifd/next/reset.scss';

import MainLayout from '@layouts/MainLayout';
import LocaleProvider from '@components/LocaleProvider';
import { ThemeProvider } from '@components/ThemeProvider';
import { getLocale } from '@utils/locale';

const locale = getLocale();
const ICE_CONTAINER = document.getElementById('ice-container');

ReactDOM.render(
  <LocaleProvider locale={locale}>
    <ThemeProvider>
      <Router>
        <Route path="/" component={MainLayout} />
      </Router>
    </ThemeProvider>
  </LocaleProvider>,
  ICE_CONTAINER
);
