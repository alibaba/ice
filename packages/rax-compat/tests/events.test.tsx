import { expect, it, describe, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { useRef, useEffect } from '../src/index';
import { createElement } from '../src/create-element';
import findDOMNode from '../src/find-dom-node';
import transformPrototypes from '../src/prototypes';

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
    expect(transformPrototypes({
      ontouchstart: () => { },
    }).onTouchStart).toBeInstanceOf(Function);
  });

  it('should work with onclick', () => {
    expect(transformPrototypes({
      onclick: () => { },
    }).onClick).toBeInstanceOf(Function);
    expect(transformPrototypes({
      onclick: () => { },
    }).onclick).toBe(undefined);
  });

  it('should work with onClick', () => {
    expect(transformPrototypes({
      onClick: () => { },
    }).onClick).toBeInstanceOf(Function);
  });

  it('should work with ondblclick', () => {
    expect(transformPrototypes({
      ondblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformPrototypes({
      ondblclick: () => { },
    }).ondblclick).toBe(undefined);
  });

  it('should work with onDblclick', () => {
    expect(transformPrototypes({
      onDblclick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
    expect(transformPrototypes({
      onDblclick: () => { },
    }).onDblclick).toBe(undefined);
  });

  it('should work with onDoubleClick', () => {
    expect(transformPrototypes({
      onDoubleClick: () => { },
    }).onDoubleClick).toBeInstanceOf(Function);
  });

  it('should work with onmouseenter', () => {
    expect(transformPrototypes({
      onmouseenter: () => { },
    }).onMouseEnter).toBeInstanceOf(Function);
    expect(transformPrototypes({
      onmouseenter: () => { },
    }).onmouseenter).toBe(undefined);
  });

  it('should work with onpointerenter', () => {
    expect(transformPrototypes({
      onpointerenter: () => { },
    }).onPointerEnter).toBeInstanceOf(Function);
    expect(transformPrototypes({
      onpointerenter: () => { },
    }).onpointerenter).toBe(undefined);
  });

  it('should work with onchange', () => {
    expect(transformPrototypes({
      onchange: () => { },
    }).onChange).toBeInstanceOf(Function);
    expect(transformPrototypes({
      onchange: () => { },
    }).onchange).toBe(undefined);
  });

  it('should work with onbeforeinput', () => {
    expect(transformPrototypes({
      onbeforeinput: () => { },
    }).onBeforeInput).toBeInstanceOf(Function);
    expect(transformPrototypes({
      onbeforeinput: () => { },
    }).onbeforeinput).toBe(undefined);
  });
});
