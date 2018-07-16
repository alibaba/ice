import React from 'react';
import ReactDOM from 'react-dom';
import Collapses from './Collapses';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Collapses />, div);
  ReactDOM.unmountComponentAtNode(div);
});
