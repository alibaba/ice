import React, { Component } from 'react';
import { render } from 'react-dom';
import DemoLayout from '@icedesign/demo-layout';
import Block from '../src';

render(
  <DemoLayout type="ice-design">
    <Block />
  </DemoLayout>,
  document.querySelector('#mountNode')
);
