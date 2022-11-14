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
    expect(transformProps({
      ontouchstart: () => { },
    }).onTouchStart).toBeInstanceOf(Function);
  });

  it('should work with onclick', () => {
    expect(transformProps({
      onclick: () => { },
    }).onClick).toBeInstanceOf(Function);
    expect(transformProps({
      onclick: () => { },
    }).onclick).toBe(undefined);
  });

  it('should work with onClick', () => {
    expect(transformProps({
      onClick: () => { },
    }).onClick).toBeInstanceOf(Function);
  });

  it('should work with ondblclick', () => {
    expect(transformProps({
      ondblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformProps({
      ondblclick: () => { },
    }).ondblclick).toBe(undefined);
  });

  it('should work with onDblclick', () => {
    expect(transformProps({
      onDblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformProps({
      onDblclick: () => { },
    }).onDblclick).toBe(undefined);
  });

  it('should work with onDoubleClick', () => {
    expect(transformProps({
      onDoubleClick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
  });

  it('should work with onmouseenter', () => {
    expect(transformProps({
      onmouseenter: () => { },
    }).onMouseEnter).toBeInstanceOf(Function);
    expect(transformProps({
      onmouseenter: () => { },
    }).onmouseenter).toBe(undefined);
  });

  it('should work with onpointerenter', () => {
    expect(transformProps({
      onpointerenter: () => { },
    }).onPointerEnter).toBeInstanceOf(Function);
    expect(transformProps({
      onpointerenter: () => { },
    }).onpointerenter).toBe(undefined);
  });

  it('should work with onchange', () => {
    expect(transformProps({
      onchange: () => { },
    }).onChange).toBeInstanceOf(Function);
    expect(transformProps({
      onchange: () => { },
    }).onchange).toBe(undefined);
  });

  it('should work with onbeforeinput', () => {
    expect(transformProps({
      onbeforeinput: () => { },
    }).onBeforeInput).toBeInstanceOf(Function);
    expect(transformProps({
      onbeforeinput: () => { },
    }).onbeforeinput).toBe(undefined);
  });
});
