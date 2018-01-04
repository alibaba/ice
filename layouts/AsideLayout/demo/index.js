import React, { Component } from 'react';
import { render } from 'react-dom';
import Layout from '../src';
import '@icedesign/base/lib/_components/@alife/next-core/lib/index.scss';

const props = {
  // ...
};

render((
  <Layout {...props}>
  </Layout>
), document.querySelector('#mountNode'));
