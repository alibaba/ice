import React from 'react';
import { render } from 'react-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import Block from '../src';

const props = {
  // ...
};

render(<Block {...props} />, document.querySelector('#mountNode'));
