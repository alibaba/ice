import React, { Component } from 'react';
import { render } from 'react-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import Layout from '../src';

const props = {
  // ...
};

render(<Layout {...props} />, document.querySelector('#mountNode'));
