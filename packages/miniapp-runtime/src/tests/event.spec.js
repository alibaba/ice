import { expect, describe, test, vi } from 'vitest';
import { document, createEvent } from '../index';

describe('event', () => {
  test('can addEventListener', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    div.addEventListener('tap', spy);
    const event = createEvent({ type: 'tap' }, div);
    // mini program event system will do this for us
    div.dispatchEvent(event);
  });

  test('event once should work', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    div.addEventListener('tap', spy, { once: true });
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
  });

  test('可以多次 dispatchEvent', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    div.addEventListener('tap', spy);
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(2);
  });

  test('同一事件可以添加多个 handlers', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    const spy2 = vi.fn();
    div.addEventListener('tap', spy);
    div.addEventListener('tap', spy2);
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });

  test('remove 一个 handler 不会影响其它 handler', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    const spy2 = vi.fn();
    div.addEventListener('tap', spy);
    div.addEventListener('tap', spy2);
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    div.removeEventListener('tap', spy);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(2);
  });

  test('添加事件名会被小写化', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    const spy2 = vi.fn();
    div.addEventListener('Tap', spy);
    div.addEventListener('TAP', spy2);
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    div.removeEventListener('tap', spy);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(2);
  });

  test('remove 空事件也不会报错', () => {
    const div = document.createElement('div');
    expect(() => {
      div.removeEventListener('tap', vi.fn());
    }).not.toThrow();
  });

  test('可以阻止冒泡', () => {
    const container = document.createElement('container');
    const div = document.createElement('div');
    container.appendChild(div);
    const containerSpy = vi.fn();
    const divSpy = vi.fn();
    container.addEventListener('tap', containerSpy);
    div.addEventListener('tap', (e) => {
      divSpy();
      e.stopPropagation();
    });
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    container.dispatchEvent(event); // buble event
    expect(divSpy).toBeCalledTimes(1);
    expect(containerSpy).toBeCalledTimes(0);
  });

  test('非冒泡事件不会在父元素触发', () => {
    const eventName = 'unknown';
    const container = document.createElement('container');
    const div = document.createElement('div');
    container.appendChild(div);
    const containerSpy = vi.fn();
    const divSpy = vi.fn();
    container.addEventListener(eventName, containerSpy);
    div.addEventListener(eventName, divSpy);
    const event = createEvent({ type: eventName }, div);
    div.dispatchEvent(event);
    container.dispatchEvent(event); // buble event
    expect(divSpy).toBeCalledTimes(1);
    expect(containerSpy).toBeCalledTimes(1);
  });

  test('preventDefault', () => {
    const container = document.createElement('container');
    const div = document.createElement('div');
    container.appendChild(div);
    const containerSpy = vi.fn();
    const divSpy = vi.fn();
    container.addEventListener('tap', containerSpy);
    div.addEventListener('tap', (e) => {
      divSpy();
      e.preventDefault();
    });
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(divSpy).toBeCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  test('stopImmediatePropagation()', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    const spy2 = vi.fn();
    div.addEventListener('tap', spy2);
    div.addEventListener('tap', (e) => {
      spy();
      e.stopImmediatePropagation();
    });
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(0);
  });

  test('dispatchEvent 也会被小写', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    const spy2 = vi.fn();
    div.addEventListener('tap', spy2);
    div.addEventListener('tap', (e) => {
      spy();
      e.stopImmediatePropagation();
    });
    const event = createEvent({ type: 'Tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(0);
  });

  test('可以发送没有监听的事件', () => {
    const container = document.createElement('container');
    const div = document.createElement('div');
    container.appendChild(div);
    const containerSpy = vi.fn();
    const divSpy = vi.fn();
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    container.dispatchEvent(event); // buble event
    expect(divSpy).toBeCalledTimes(0);
    expect(containerSpy).toBeCalledTimes(0);
  });
});
