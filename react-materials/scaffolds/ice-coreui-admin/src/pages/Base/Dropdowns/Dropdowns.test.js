import React from 'react';
import ReactDOM from 'react-dom';
import Dropdowns from './Dropdowns';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dropdowns />, div);
  ReactDOM.unmountComponentAtNode(div);
});
