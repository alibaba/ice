/**
 * 定义应用路由
 */
import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import BasicLayout from './layouts/BasicLayout';

const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={BasicLayout} />
      </Switch>
    </HashRouter>
  );
};

export default router;
