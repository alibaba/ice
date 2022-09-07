import React from 'react';
import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import { Component } from '../src/index';
import cloneElement from '../src/clone-element';

describe('cloneElement', () => {
  it('basic', () => {
    class TextComponent extends Component {
      render() {
        return <div data-testid="TextComponent" >render text</div>;
      }
    }

    const wrapper = render(cloneElement(<TextComponent />));
    const node = wrapper.queryByTestId('TextComponent');

    expect(node.textContent).toBe('render text');
  });
});
