import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/now-ui-dashboard.scss';

import BasicLayout from './layouts/BasicLayout';

const history = createHashHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" component={BasicLayout} />;
    </Switch>
  </Router>,
  document.getElementById('root')
);
