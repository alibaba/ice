/**
 * @vitest-environment jsdom
 */

import { expect, it, describe } from 'vitest';
import transformProps from '../src/props';

describe('props', () => {
  it('should work with autofocus', () => {
    expect(transformProps({
      autofocus: true,
    }).autoFocus).toBe(true);
  });

  it('should work with autoplay', () => {
    expect(transformProps({
      autoplay: true,
    }).autoPlay).toBe(true);
  });

  it('should work with classname', () => {
    expect(transformProps({
      classname: 'class',
    }).className).toBe('class');
  });

  it('should work with crossorigin', () => {
    expect(transformProps({
      crossorigin: 'xxx',
    }).crossOrigin).toBe('xxx');
  });

  it('should work with maxlength', () => {
    expect(transformProps({
      maxlength: '10',
    }).maxLength).toBe('10');
  });

  it('should work with inputmode', () => {
    expect(transformProps({
      inputmode: 'numeric',
    }).inputMode).toBe('numeric');
  });
});
