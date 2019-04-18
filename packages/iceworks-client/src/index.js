import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@utils/logger';
import '@alifd/next/reset.scss';

import MainLayout from './layouts/MainLayout';
import LocaleProvider from './components/LocaleProvider';
import { getLocale } from './utils/locale';

const locale = getLocale();
const ICE_CONTAINER = document.getElementById('ice-container');

ReactDOM.render(
  <LocaleProvider locale={locale}>
    <Router>
      <Route path="/" component={MainLayout} />
    </Router>
  </LocaleProvider>,
  ICE_CONTAINER,
);
