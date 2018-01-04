import React, { Component } from 'react';
import { render } from 'react-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/lib/_components/@alife/next-core/lib/index.scss';

import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

Block.show({
  onClose: () => {
    Block.hide();
  },
  onCancel: () => {
    Block.hide();
  },
  onOk: selectedItems => {
    console.log('selectedItems', selectedItems);
    Block.hide();
  },
  selectedItems: ['231']
});

const props = {
  // ...
};

render(
  <DemoLayout type="ice-design">
    <div />
  </DemoLayout>,
  document.querySelector('#mountNode')
);
