/**
 * @vitest-environment jsdom
 */

import { expect, it, describe, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { useRef, useEffect } from '../src/index';
import { createElement } from '../src/create-element';
import findDOMNode from '../src/find-dom-node';
import transformProps from '../src/props';

describe('events', () => {
  it('should work with onclick', () => {
    function App() {
      const ref = useRef(null);

      const obj = {
        handleClick: () => console.log('click'),
      };

      const click = vi.spyOn(obj, 'handleClick');

      useEffect(() => {
        const dom = findDOMNode(ref.current);
        dom.click();
        expect(click).toHaveBeenCalled();
      });

      return createElement('div', {
        onclick: obj.handleClick,
        ref: ref,
      }, 'click me');
    }

    render(<App />);
  });

  it('should work with ontouchstart', () => {
    expect(transformProps('div', {
      ontouchstart: () => { },
    }).onTouchStart).toBeInstanceOf(Function);
  });

  it('should work with onclick', () => {
    expect(transformProps('div', {
      onclick: () => { },
    }).onClick).toBeInstanceOf(Function);
    expect(transformProps('div', {
      onclick: () => { },
    }).onclick).toBe(undefined);
  });

  it('should work with onClick', () => {
    expect(transformProps('div', {
      onClick: () => { },
    }).onClick).toBeInstanceOf(Function);
  });

  it('should work with ondblclick', () => {
    console.log('aaaaaa', transformProps('div', {
      ondblclick: () => { },
    }));
    expect(transformProps('div', {
      ondblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformProps('div', {
      ondblclick: () => { },
    }).ondblclick).toBe(undefined);
  });

  it('should work with onDblclick', () => {
    expect(transformProps('div', {
      onDblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformProps('div', {
      onDblclick: () => { },
    }).onDblclick).toBe(undefined);
  });

  it('should work with onDoubleClick', () => {
    expect(transformProps('div', {
      onDoubleClick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
  });

  it('should work with onmouseenter', () => {
    expect(transformProps('div', {
      onmouseenter: () => { },
    }).onMouseEnter).toBeInstanceOf(Function);
    expect(transformProps('div', {
      onmouseenter: () => { },
    }).onmouseenter).toBe(undefined);
  });

  it('should work with onpointerenter', () => {
    expect(transformProps('div', {
      onpointerenter: () => { },
    }).onPointerEnter).toBeInstanceOf(Function);
    expect(transformProps('div', {
      onpointerenter: () => { },
    }).onpointerenter).toBe(undefined);
  });

  it('should work with onchange', () => {
    expect(transformProps('div', {
      onchange: () => { },
    }).onChange).toBeInstanceOf(Function);
    expect(transformProps('div', {
      onchange: () => { },
    }).onchange).toBe(undefined);
  });

  it('should work with onbeforeinput', () => {
    expect(transformProps('div', {
      onbeforeinput: () => { },
    }).onBeforeInput).toBeInstanceOf(Function);
    expect(transformProps('div', {
      onbeforeinput: () => { },
    }).onbeforeinput).toBe(undefined);
  });
});
