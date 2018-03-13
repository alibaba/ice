import React, { Component } from 'react';
import { render } from 'react-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

const props = {
  // ...
};

render(
  <DemoLayout type="ice-design">
    <Block {...props} />
  </DemoLayout>,
  document.querySelector('#mountNode')
);
