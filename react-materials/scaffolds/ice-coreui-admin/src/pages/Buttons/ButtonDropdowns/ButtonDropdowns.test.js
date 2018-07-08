import React from 'react';
import ReactDOM from 'react-dom';
import ButtonDropdowns from './ButtonDropdowns';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonDropdowns />, div);
  ReactDOM.unmountComponentAtNode(div);
});
