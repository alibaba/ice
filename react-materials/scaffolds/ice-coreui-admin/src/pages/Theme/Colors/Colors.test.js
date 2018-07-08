import React from 'react';
import Colors from './Colors';
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<Colors />);
});
