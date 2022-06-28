import { expect, it, describe } from 'vitest';
import React from 'react';
import { useRef, useEffect } from '../src/index';
import findDOMNode from '../src/find-dom-node';
import { render } from '@testing-library/react';

describe('findDomNode', () => {
  it('basic', () => {
    const str = 'findDomNode';
    function App() {
      const ref = useRef(null);
      useEffect(() => {
        const dom = findDOMNode(ref.current);
        expect(dom.textContent).toBe(str);
      });
      return <div ref={ref} >{str}</div>;
    }

    render(<App />);
  });
});
