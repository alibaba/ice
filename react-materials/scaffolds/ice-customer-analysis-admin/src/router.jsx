/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = () => {
  return (
    <Switch>
      <Route path="/user" component={UserLayout} />
      <Route path="/" component={BasicLayout} />
    </Switch>
  );
};

export default router;
