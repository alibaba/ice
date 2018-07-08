import React from 'react';
import ReactDOM from 'react-dom';
import SimpleLineIcons from './SimpleLineIcons';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SimpleLineIcons />, div);
  ReactDOM.unmountComponentAtNode(div);
});