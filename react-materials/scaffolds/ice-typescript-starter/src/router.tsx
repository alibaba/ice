/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import BasicLayout from './layouts/BasicLayout';

const router = () => {
  return (
    <Switch>
      <Route path="/" component={BasicLayout} />
    </Switch>
  );
};

export default router;
