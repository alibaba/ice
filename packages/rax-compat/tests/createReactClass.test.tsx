import { expect, it, describe } from 'vitest';
import React from 'react';
import createReactClass from '../src/create-class';
import { render } from '@testing-library/react';

describe('createReactClass', () => {
  it('basic', () => {
    const ReactClass = createReactClass({
      name: '',
      id: '',
      render: function() {
        return <div data-testid={this.props.id}>Hello, {this.props.name}</div>;
      }
    });

    const wrapper = render(<ReactClass id="reactClassId" name="raxCompat" />);
    let res = wrapper.getAllByTestId('reactClassId');

    expect(res.length).toBe(1);
  });
});
