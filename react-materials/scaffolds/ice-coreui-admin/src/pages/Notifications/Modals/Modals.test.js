import React from 'react';
import ReactDOM from 'react-dom';
import Modals from './Modals';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Modals />, div);
  ReactDOM.unmountComponentAtNode(div);
});
