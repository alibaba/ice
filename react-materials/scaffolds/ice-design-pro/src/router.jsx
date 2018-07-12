/* eslint arrow-parens:0 */
/**
 * 定义应用路由
 */
import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { routerData } from './routerConfig';

const router = () => {
  return (
    <Switch>
      {routerData.map((item, index) => {
        return <Route key={index} path={item.path} component={item.layout} />;
      })}
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  );
};

// 按照 Layout 归类分组可以按照如下方式组织路由
// const router = () => {
//   return (
//     <Switch>
//       <Route path="/user" component={UserLayout} />
//       <Route path="/" component={BasicLayout} />
//     </Switch>
//   );
// };

export default router;
