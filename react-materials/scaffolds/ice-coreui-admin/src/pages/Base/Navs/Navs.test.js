import React from 'react';
import ReactDOM from 'react-dom';
import Navs from './Navs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
