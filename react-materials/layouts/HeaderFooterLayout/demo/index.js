import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import Layout from '../src';

render(
  <Router>
    <Switch>
      <Route exact path="/" component={Layout} />
    </Switch>
  </Router>,
  document.querySelector('#mountNode')
);
