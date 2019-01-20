/**
 * 定义应用路由
 */
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import BlankLayout from './layouts/BlankLayout';

const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={BlankLayout} />
      </Switch>
    </HashRouter>
  );
};

export default router();
