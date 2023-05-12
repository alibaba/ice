/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { expect, it, describe } from 'vitest';
import { shared } from '../src/index';

describe('render', () => {
  it('basic', () => {
    console.log('shared.Element', shared);
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
