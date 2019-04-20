import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/Locale';
import { ThemeProvider } from '@components/ThemeProvider';

import '@utils/logger';
import '@alifd/next/reset.scss';
import './global.scss';
import './variables.scss';

const ICE_CONTAINER = document.getElementById('iceworks');

ReactDOM.render(
  <LocaleProvider>
    <ThemeProvider>
      <Router>
        <Route path="/" component={MainLayout} />
      </Router>
    </ThemeProvider>
  </LocaleProvider>,
  ICE_CONTAINER,
);
