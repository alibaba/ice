import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard';

import 'assets/css/material-dashboard-react.css?v=1.3.0';

const history = createHashHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
