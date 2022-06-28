import React from 'react';
import { expect, it, describe } from 'vitest';
import { Component, createElement } from '../src/index';
import { render } from '@testing-library/react';

describe('createElement', () => {
  it('basic', () => {
    const str = 'hello world';
    const wrapper = render(createElement(
      'div',
      null,
      str
    ));
    expect(wrapper.container.childNodes[0].textContent).toBe(str);
  });
});
