import React, { Component } from 'react';
import { render } from 'react-dom';
import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

const props = {
  text: '是否要删除当前文章？',
  visible: true,
};

render(
  <DemoLayout type="ice-design">
    <Block {...props} />
  </DemoLayout>,
  document.querySelector('#mountNode')
);
