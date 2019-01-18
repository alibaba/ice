import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/index.scss';
import './assets/css/base.css';
import './assets/css/pe-icon-7-stroke.css';
import '@alifd/next/dist/next.min.css';

import DefaultLayout from './layouts/DefaultLayout';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route to="/" component={DefaultLayout} />;
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
