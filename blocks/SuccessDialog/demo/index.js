import React, { Component } from 'react';
import { render } from 'react-dom';
import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

const show = () => {
  Block.show({
    onClose: () => {
      Block.hide();
    },
    onCancel: () => {
      Block.hide();
    }
  });
};

const props = {
  // ...
};

render(
  <DemoLayout type="ice-design">
    <button onClick={show}>打开</button>
    <Block />
  </DemoLayout>,
  document.querySelector('#mountNode')
);
