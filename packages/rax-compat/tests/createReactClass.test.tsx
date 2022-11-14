/**
 * @vitest-environment jsdom
 */

import { expect, it, describe } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import createReactClass from '../src/create-class';

describe('createReactClass', () => {
  it('basic', () => {
    const ReactClass = createReactClass({
      name: '',
      id: '',
      render: function () {
        return <div data-testid={this.props.id}>Hello, {this.props.name}</div>;
      },
    });

    const wrapper = render(<ReactClass id="reactClassId" name="raxCompat" />);
    let res = wrapper.getAllByTestId('reactClassId');

    expect(res.length).toBe(1);
  });
});
