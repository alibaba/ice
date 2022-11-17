import { expect, it, describe } from 'vitest';
import { createStaticNavigator } from '../src/server/navigator';

describe('mock server navigator', () => {
  const staticNavigator = createStaticNavigator();
  it('createHref', () => {
    expect(staticNavigator.createHref('/')).toBe('/');
  });

  it('push', () => {
    expect(() => staticNavigator.push('/')).toThrow();
  });

  it('replace', () => {
    expect(() => staticNavigator.replace('/')).toThrow();
  });

  it('go', () => {
    expect(() => staticNavigator.go(1)).toThrow();
  });

  it('back', () => {
    expect(() => staticNavigator.back()).toThrow();
  });

  it('forward', () => {
    expect(() => staticNavigator.forward()).toThrow();
  });

  it('block', () => {
    expect(() => staticNavigator.block()).toThrow();
  });
});