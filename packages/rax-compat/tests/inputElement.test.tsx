/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import { useState } from '../src/index';
import { createElement } from '../src/create-element';

describe('inputElement', () => {
  it('should work with update input value', () => {
    function TestInput() {
      const [val, setVal] = useState('input value');
      return (<div>
        <input
          data-testid="inputValue"
          value={val}
        />

        <div
          data-testid="inputValueDiv"
          onClick={() => {
            setVal('111');
          }}
        >
          click me...
        </div>
      </div>);
    }

    const wrapper = render(createElement(TestInput));
    wrapper.queryByTestId('inputValueDiv')?.click();
    const node = wrapper.queryByTestId('inputValue');

    setTimeout(() => {
      // Wait for click handler.
      expect(node.value).toBe('111');
    }, 0);
  });

  it('inputElement should not recreate when update props', () => {
    function TestInput() {
      const [val, setVal] = useState('input value');
      return (<div>
        <input
          data-testid="sameInput"
          value={val}
        />

        <div
          data-testid="sameInputDiv"
          onClick={() => {
            setVal('111');
          }}
        >
          click me...
        </div>
      </div>);
    }

    const wrapper = render(createElement(TestInput));

    const node = wrapper.queryByTestId('sameInput');
    node?.setAttribute('date-value', 'val');

    wrapper.queryByTestId('sameInputDiv')?.click();

    setTimeout(() => {
      // Wait for click handler.
      expect(node?.getAttribute('date-value')).toBe('val');
    }, 0);
  });

  it('should work with onChange', () => {
    return new Promise((resolve) => {
      function TestInput() {
        return createElement('input', {
          'data-testid': 'changeInput',
          onChange: () => resolve(),
        });
      }

      const wrapper = render(createElement(TestInput));

      const node = wrapper.queryByTestId('changeInput');
      node!.dispatchEvent(new Event('change'));
    });
  });
});
