import { expect, it, describe, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { useRef, useEffect } from '../src/index';
import { createElement } from '../src/create-element';
import findDOMNode from '../src/find-dom-node';
import transformPrototype from '../src/prototypes';

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
    expect(transformPrototype({
      ontouchstart: () => { },
    }).onTouchStart).toBeInstanceOf(Function);
  });

  it('should work with onclick', () => {
    expect(transformPrototype({
      onclick: () => { },
    }).onClick).toBeInstanceOf(Function);
    expect(transformPrototype({
      onclick: () => { },
    }).onclick).toBe(undefined);
  });

  it('should work with onClick', () => {
    expect(transformPrototype({
      onClick: () => { },
    }).onClick).toBeInstanceOf(Function);
  });

  it('should work with ondblclick', () => {
    expect(transformPrototype({
      ondblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformPrototype({
      ondblclick: () => { },
    }).ondblclick).toBe(undefined);
  });

  it('should work with onDblclick', () => {
    expect(transformPrototype({
      onDblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformPrototype({
      onDblclick: () => { },
    }).onDblclick).toBe(undefined);
  });

  it('should work with onDoubleClick', () => {
    expect(transformPrototype({
      onDoubleClick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
  });

  it('should work with onmouseenter', () => {
    expect(transformPrototype({
      onmouseenter: () => { },
    }).onMouseEnter).toBeInstanceOf(Function);
    expect(transformPrototype({
      onmouseenter: () => { },
    }).onmouseenter).toBe(undefined);
  });

  it('should work with onpointerenter', () => {
    expect(transformPrototype({
      onpointerenter: () => { },
    }).onPointerEnter).toBeInstanceOf(Function);
    expect(transformPrototype({
      onpointerenter: () => { },
    }).onpointerenter).toBe(undefined);
  });

  it('should work with onchange', () => {
    expect(transformPrototype({
      onchange: () => { },
    }).onChange).toBeInstanceOf(Function);
    expect(transformPrototype({
      onchange: () => { },
    }).onchange).toBe(undefined);
  });

  it('should work with onbeforeinput', () => {
    expect(transformPrototype({
      onbeforeinput: () => { },
    }).onBeforeInput).toBeInstanceOf(Function);
    expect(transformPrototype({
      onbeforeinput: () => { },
    }).onbeforeinput).toBe(undefined);
  });
});
