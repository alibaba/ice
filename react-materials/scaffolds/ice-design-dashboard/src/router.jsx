/**
 * 定义应用路由
 */
import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import BlankLayout from './layouts/BlankLayout';

// 按照 Layout 分组路由
// BlankLayout 对应的路由：/xxx
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
