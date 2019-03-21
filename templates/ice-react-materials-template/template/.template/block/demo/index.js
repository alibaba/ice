import React from 'react';
import ReactDOM from 'react-dom'
import Block from '../src/index.js';

const mountNode = document.querySelector('#mountNode');
ReactDOM.render(
  <Block />,
  mountNode
);
