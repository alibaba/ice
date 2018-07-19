import React from 'react';
import ReactDOM from 'react-dom';
import CoreUIIcons from './CoreUIIcons';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoreUIIcons />, div);
  ReactDOM.unmountComponentAtNode(div);
});
