/**
 * @vitest-environment jsdom
 */

import { expect, it, describe, afterEach } from 'vitest';
import __ICE__CREATE_ELEMENT from '../src/domRender';

describe('domRender', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  it('basic', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    __ICE__CREATE_ELEMENT({
      tagName: 'span',
    }, div);

    expect(div.childNodes.length).toBe(1);
  });

  it('should work with tagName', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    __ICE__CREATE_ELEMENT({
      tagName: 'span',
    }, div);

    expect(div.childNodes[0].tagName).toBe('SPAN');
  });

  it('should work with children', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    __ICE__CREATE_ELEMENT({
      tagName: 'div',
      children: [
        {
          tagName: 'span',
        },
        {
          tagName: 'span',
        },
        {
          tagName: 'span',
        },
      ],
    }, div);

    expect(div.childNodes[0].childNodes.length).toBe(3);
  });

  it('should work with text', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    __ICE__CREATE_ELEMENT({
      text: 'text',
    }, div);

    expect(div.childNodes[0].textContent).toBe('text');
  });

  it('should work with attribute', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    __ICE__CREATE_ELEMENT({
      tagName: 'div',
      attributes: {
        'data-key': 111,
      },
    }, div);

    expect(div.childNodes[0].getAttribute('data-key')).toBe('111');
  });

  it('should work with head', () => {
    __ICE__CREATE_ELEMENT({
      tagName: 'meta',
      attributes: {
        name: 'description',
      },
    }, document.head);

    expect(document.head.childNodes.length).toBe(1);
  });

  it('should work with body', () => {
    __ICE__CREATE_ELEMENT({
      tagName: 'meta',
      attributes: {
        name: 'description',
      },
    }, document.body);

    expect(document.body.childNodes.length).toBe(1);
  });

  it('should work with child', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    __ICE__CREATE_ELEMENT({
      tagName: 'div',
      children: [
        {
          tagName: 'span',
        },
      ],
    }, div);

    expect(div.childNodes[0].childNodes.length).toBe(1);
  });
});
