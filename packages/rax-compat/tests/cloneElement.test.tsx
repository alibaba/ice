import React from 'react';
import { expect, it, describe } from 'vitest';
import { Component } from '../src/index';
import cloneElement from '../src/clone-element';
import { render } from '@testing-library/react';

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
