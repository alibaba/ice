import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroups from './ButtonGroups';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonGroups />, div);
  ReactDOM.unmountComponentAtNode(div);
});
