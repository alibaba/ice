import React from 'react';
import { expect, it, describe } from 'vitest';
import { Component, createElement } from '../src/index';
import { render } from '@testing-library/react';

describe('createElement', () => {
  it('basic', () => {
    class TextComponent extends Component {
      render() {
        return createElement(
          'div',
          { 'data-testid': 'test' },
          createElement('p', null, 'hello world')
        );
      }
    }

    const wrapper = render(<TextComponent />);
    const node = wrapper.queryByTestId('test');
    expect(node.childNodes[0].tagName).toBe('P');
  });
});
