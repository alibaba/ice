import { expect, describe, test } from 'vitest';
import { document, navigator, window, Element, Node, Text, createEvent, Event, createComponentConfig, createPageConfig } from '../index';

describe('style', () => {
  test('bom', () => {
    expect(window).not.toBeUndefined();
    expect(window.navigator).not.toBeUndefined();
    expect(window.document).not.toBeUndefined();
    expect(document).toBe(window.document);
    expect(navigator).toBe(window.navigator);
  });

  test('dom', () => {
    expect(Element).not.toBeUndefined();
    expect(Node).not.toBeUndefined();
    expect(Text).not.toBeUndefined();
  });

  test('event', () => {
    expect(createEvent).not.toBeUndefined();
    expect(Event).not.toBeUndefined();
  });

  test('dsl', () => {
    expect(createComponentConfig).not.toBeUndefined();
    expect(createPageConfig).not.toBeUndefined();
  });
});
