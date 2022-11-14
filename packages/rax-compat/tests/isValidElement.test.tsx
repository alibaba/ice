/**
 * @vitest-environment jsdom
 */

import { expect, it, describe } from 'vitest';
import React from 'react';
import isValidElement from '../src/is-valid-element';

describe('isValidElement', () => {
  it('basic', () => {
    function App() {
      return (<div>
        <div>isValidElement</div>
      </div>);
    }

    expect(isValidElement(<App />)).toBe(true);
    expect(isValidElement({})).toBe(false);
    expect(isValidElement('')).toBe(false);
    expect(isValidElement(1)).toBe(false);
    expect(isValidElement(() => { })).toBe(false);
  });
});
