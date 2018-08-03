import React from 'react';
import ReactDOM from 'react-dom';
import Switches from './Switches';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Switches />, div);
  ReactDOM.unmountComponentAtNode(div);
});
