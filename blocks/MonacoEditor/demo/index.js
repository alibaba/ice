import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

render(
  <Router history={hashHistory}>
    <Route path="/" component={DemoLayout}>
      <IndexRoute component={Block} />
      <Route path="*" component="div" />
    </Route>
  </Router>,
  document.querySelector('#mountNode')
);
