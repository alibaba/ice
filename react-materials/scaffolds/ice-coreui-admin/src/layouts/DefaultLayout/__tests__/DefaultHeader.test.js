import React from 'react';
import ReactDOM from 'react-dom';
import DefaultHeader from '../DefaultHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
