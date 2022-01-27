import ice from '../src/index';

describe('basic test', () => {
  it('test return value', () => {
    expect(ice()).toBe('ice');
  });
});