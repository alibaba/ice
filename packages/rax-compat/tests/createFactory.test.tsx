/**
 * @vitest-environment jsdom
 */

import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import createFactory from '../src/create-factory';

describe('createFactory', () => {
  it('basic', () => {
    const factory = createFactory('div');
    const div = factory(null, 'div node');

    const wrapper = render(div);
    let res = wrapper.getAllByText('div node');

    expect(res.length).toBe(1);
  });
});
