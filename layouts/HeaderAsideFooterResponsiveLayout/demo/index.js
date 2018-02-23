import React from 'react';
import { render } from 'react-dom';
import '@icedesign/base/reset.scss';
import Layout from '../src';

const props = {
  // ...
};

render(<Layout {...props} />, document.querySelector('#mountNode'));
