import React, { Component } from 'react';
import { render } from 'react-dom';
import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

const props = {
  // ...
};

render((
  <DemoLayout type="ice-design">
    <Block {...props} />
  </DemoLayout>
), document.querySelector('#mountNode'));
