import React from 'react';
import { render } from 'react-dom';
import '@icedesign/base/reset.scss';
import Layout from '../src';

const props = {
  // ...
};

render(
  <Layout {...props}>Hello World</Layout>,
  document.querySelector('#mountNode')
);
