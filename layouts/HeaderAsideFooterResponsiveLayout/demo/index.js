import React from 'react';
import { render } from 'react-dom';
import '@icedesign/base/lib/_components/@alife/next-core/lib/index.scss';
import Layout from '../src';

const props = {
  // ...
};

render((
  <Layout {...props} />
), document.querySelector('#mountNode'));
