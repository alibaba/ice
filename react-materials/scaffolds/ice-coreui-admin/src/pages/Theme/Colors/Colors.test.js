import React from 'react';
import { shallow } from 'enzyme';
import Colors from './Colors';

it('renders without crashing', () => {
  shallow(<Colors />);
});
