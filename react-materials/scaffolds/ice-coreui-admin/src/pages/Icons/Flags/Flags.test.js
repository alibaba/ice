import React from 'react';
import ReactDOM from 'react-dom';
import Flags from './Flags';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Flags />, div);
  ReactDOM.unmountComponentAtNode(div);
});
