import React, { Component } from 'react';
import { render } from 'react-dom';
import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

Block.show({
  onClose: () => {
    Block.hide();
  },
  onCancel: () => {
    Block.hide();
  },
  text: '是否要删除当前文章？'
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
