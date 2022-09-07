import React from 'react';
import { expect, it, describe } from 'vitest';
import { shared } from '../src/index';

describe('render', () => {
  it('basic', () => {
    console.log('shared.Element', shared);
    expect(shared.Element).toBe(null);
    expect(shared.Host).toBe(null);
    expect(shared.Instance).toBe(null);
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
