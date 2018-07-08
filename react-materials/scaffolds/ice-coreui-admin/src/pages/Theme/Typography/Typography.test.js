import React from 'react';
import ReactDOM from 'react-dom';
import Typography from './Typography';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Typography />, div);
  ReactDOM.unmountComponentAtNode(div);
});