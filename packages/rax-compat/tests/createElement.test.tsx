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

  it('should work with onAppear', () => {
    let appearFun = vi.spyOn({
      func: () => {
        expect(appearFun).toHaveBeenCalled();
      }
    }, 'func')
    const str = 'hello world';
    render(createElement(
      'div',
      {
        onAppear: appearFun
      },
      str
    ));
  });

  it('should work with onDisappear', () => {
    const func = () => {
      expect(disappearFun).toHaveBeenCalled();
    }
    let disappearFun = vi.spyOn({
      func: func
    }, 'func')
    const str = 'hello world';
    render(createElement(
      'div',
      {
        onDisappear: func,
      },
      str
    ));
  });

  it('rpx should transform to vw', () => {
    const str = 'hello world';
    const wrapper = render(createElement(
      'div',
      {
        'data-testid': 'rpxTest',
        style: {
          width: '300rpx'
        }
      },
      str
    ));

    const node = wrapper.queryByTestId('rpxTest');
    expect(node.style.width).toBe('40vw');
  });

  it('should work with value', () => {
    const str = 'hello world';
    const wrapper = render(createElement(
      'input',
      {
        'data-testid': 'valueTest',
        value: str,
      },
    ));

    const node = wrapper.queryByTestId('valueTest');
    expect(node.value).toBe(str);
  });

  it('input set empty string to maxlength not be 0', () => {
    const str = 'hello world';
    const wrapper = render(createElement(
      'input',
      {
        'data-testid': 'maxlengthTest',
        value: str,
        maxlength: ''
      },
    ));

    const node = wrapper.queryByTestId('valueTest');
    expect(node?.getAttribute('maxlength')).toBe(null);
  });
});
