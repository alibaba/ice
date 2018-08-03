import React from 'react';
import ReactDOM from 'react-dom';
import Navbars from './Navbars';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbars />, div);
  ReactDOM.unmountComponentAtNode(div);
});
