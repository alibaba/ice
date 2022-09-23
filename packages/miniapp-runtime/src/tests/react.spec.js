import { expect, describe, test, vi } from 'vitest';
import { document, createEvent } from '../index';
describe('react', () => {
  test('event should work', () => {
    const div = document.createElement('div');
    const spy = vi.fn();
    div.addEventListener('tap', spy);
    const event = createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
  });
});
