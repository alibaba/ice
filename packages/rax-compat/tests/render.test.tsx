import React from 'react';
import { expect, it, describe } from 'vitest';
import { Component } from '../src/index';
import { render } from '@testing-library/react';

describe('render', () => {
  it('basic', () => {
    class TextComponent extends Component {
      render() {
        return <div data-testid="test" >render text</div>;
      }
    }

    const wrapper = render(<TextComponent />);
    const node = wrapper.queryByTestId('test');
    expect(node.textContent).toBe('render text');
  });
});
