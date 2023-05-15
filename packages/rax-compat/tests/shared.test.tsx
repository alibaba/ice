/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { expect, it, describe } from 'vitest';
import { forwardRef, useRef, useEffect } from 'react';
import { render } from '@testing-library/react';
import { shared } from '../src/index';
import cloneElement from './libs/rax-clone-element';
import createPortal from './libs/rax-create-portal';
import unmountComponentAtNode from './libs/rax-unmount-component-at-node';

describe('shared', () => {
  it('base', () => {
    expect(typeof shared.Element).toBe('function');
    expect(Object.keys(shared.Host).includes('owner')).toBeTruthy();
    let node = {};
    let instance = {
      test: Math.random(),
    };
    shared.Instance.set(node, instance);
    expect(shared.Instance.get(node).test).toBe(instance.test);
    expect(shared.flattenChildren).instanceOf(Function);
  });


  it('create-portal', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Portal = ({ children }) => {
      return createPortal(children, div);
    };
    const App = () => {
      return (<div>
        <Portal>portal</Portal>
      </div>);
    };

    render(<App />);
    expect(div.childNodes.length).toBe(1);
  });

  it('unmountComponentAtNode', () => {
    const Hello = forwardRef<any, any>(({ name }, ref) => {
      return <div>》<span ref={ref}>{ name }</span>《</div>;
    });
    const Hello2 = forwardRef<any, any>(({ name }, ref) => {
      const refin = useRef();
      const hello = <Hello name={name} ref={refin} />;
      useEffect(() => {
        expect(refin.current).toBeUndefined();
      }, []);
      let ele = cloneElement(hello, {
        name: `2-${name}`,
        ref,
      });
      return ele;
    });
    const App = () => {
      const parent = useRef<any>();
      const ref = useRef<any>();
      useEffect(() => {
        ref.current.textContent = '123-by-ref';
        unmountComponentAtNode(ref.current);
        expect(parent.current.textContent).toBe('》《');
      }, []);
      return (<div ref={parent}>
        <Hello2 name="123" ref={ref} />
      </div>);
    };

    render(<App />);
  });


  it('flattenChildren null', () => {
    // @ts-ignore e
    expect(shared.flattenChildren(null)).toBe(null);
  });

  it('flattenChildren common', () => {
    expect(shared.flattenChildren(<>div</>)).toStrictEqual(<React.Fragment>div</React.Fragment>);
  });

  it('flattenChildren array', () => {
    const children = [[[<>div</>]]];
    expect(shared.flattenChildren(children)).toStrictEqual(<React.Fragment>div</React.Fragment>);
  });
});
