import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './Forms';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Forms />, div);
  ReactDOM.unmountComponentAtNode(div);
});
