import React, { Component } from 'react';
import { render } from 'react-dom';
import Layout from '../src';
import '@icedesign/base/lib/_components/@alife/next-core/lib/index.scss';

const props = {
  // ...
};

render(
  <Layout {...props}>
    <div
      style={{
        minHeight: '100vh',
        background:
          "url('https://img.alicdn.com/tfs/TB1j9kWgvDH8KJjy1XcXXcpdXXa-1680-870.jpg')"
      }}
    />
  </Layout>,
  document.querySelector('#mountNode')
);
