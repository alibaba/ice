import React from 'react';
import ReactDOM from 'react-dom';
import BrandButtons from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrandButtons />, div);
  ReactDOM.unmountComponentAtNode(div);
});
