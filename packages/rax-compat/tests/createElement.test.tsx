import { expect, it, describe, vi } from 'vitest';
import { createElement } from '../src/index';
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

  it('work with onAppear', () => {
    let appearFun = vi.spyOn({
      func: () => {
        expect(appearFun).toHaveBeenCalled();
      }
    }, 'func')
    const str = 'hello world';
    const wrapper = render(createElement(
      'div',
      {
        onAppear: appearFun
      },
      str
    ));
  });
});
