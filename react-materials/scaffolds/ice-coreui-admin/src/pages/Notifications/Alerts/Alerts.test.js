import React from 'react';
import ReactDOM from 'react-dom';
import Alerts from './Alerts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Alerts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
