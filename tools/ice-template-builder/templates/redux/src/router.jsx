/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom';
import React from 'react';

<% if (redux.enabled && redux.registerLoginModule) { %>
import UserLayout from './layouts/UserLayout';
<% } %>

import BasicLayout from './layouts/BasicLayout';

// 按照 Layout 归类分组可以按照如下方式组织路由
const router = () => {
  return (
    <Switch>
      <% if (redux.enabled && redux.registerLoginModule) { %>
      <Route path="/user" component={UserLayout} />
      <% } %>
      <Route path="/" component={BasicLayout} />
    </Switch>
  );
};

export default router;
