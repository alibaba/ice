import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from './FontAwesome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FontAwesome />, div);
  ReactDOM.unmountComponentAtNode(div);
});