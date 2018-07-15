import React from 'react';
import ReactDOM from 'react-dom';
import Widgets from './Widgets';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Widgets />, div);
  ReactDOM.unmountComponentAtNode(div);
});
