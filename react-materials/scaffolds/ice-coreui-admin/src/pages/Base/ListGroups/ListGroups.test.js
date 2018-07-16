import React from 'react';
import ReactDOM from 'react-dom';
import ListGroups from './ListGroups';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListGroups />, div);
  ReactDOM.unmountComponentAtNode(div);
});
