import React from 'react';
import ReactDOM from 'react-dom';
import Tooltips from './Tooltips';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Tooltips />, div);
  ReactDOM.unmountComponentAtNode(div);
});
