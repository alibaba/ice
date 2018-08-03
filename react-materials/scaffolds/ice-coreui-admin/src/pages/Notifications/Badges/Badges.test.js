import React from 'react';
import ReactDOM from 'react-dom';
import Badges from './Badges';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Badges />, div);
  ReactDOM.unmountComponentAtNode(div);
});
