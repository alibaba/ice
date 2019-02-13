/**
 * 定义应用路由
 */
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import HeaderFooterLayout from './layouts/HeaderFooterLayout';

const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={HeaderFooterLayout} />
      </Switch>
    </HashRouter>
  );
};

export default router();
