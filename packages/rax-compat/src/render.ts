import type { RaxElement, RenderOption } from 'rax';
import type { ReactNode } from 'react';
import type { RootOptions } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { isFunction } from './type';

/**
 * Compat render for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/render.js#L5
 * @param element
 * @param container
 * @param options
 * @param callback
 * @returns componentInstance
 */
export default function render(
  element: RaxElement,
  container: Element | DocumentFragment | null,
  options?: RenderOption,
  callback?: Function,
): RaxElement {
  if (isFunction(options)) {
    callback = options;
    options = null;
  }

  const root = createRoot(container, options as RootOptions);
  root.render(element as ReactNode);
  if (isFunction(callback)) {
    callback.call(element);
  }
  return element;
}
