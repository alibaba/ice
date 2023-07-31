import type { RaxElement, RenderOption } from 'rax';
import type { ReactNode } from 'react';
import type { RootOptions } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { isFunction } from './type.js';
import { containerRootMap } from './container-root-map.js';

export default function render(
  element: RaxElement,
  container: Element | DocumentFragment | null,
  options?: RenderOption,
): RaxElement;
export default function render(
  element: RaxElement,
  container: Element | DocumentFragment | null,
  callback?: Function,
): RaxElement;
export default function render(
  element: RaxElement,
  container: Element | DocumentFragment | null,
  options?: RenderOption,
  callback?: Function,
): RaxElement;
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
  optionsOrCallback?: RenderOption | Function,
  callback?: Function,
): RaxElement {
  if (isFunction(optionsOrCallback)) {
    callback = optionsOrCallback;
    optionsOrCallback = {} as RenderOption;
  }

  /**
   * Compat for rax driver-dom behavior, which use body as container for nullish container.
   * ref: https://github.com/alibaba/rax/blob/13d80a491f18c74034aa9b05c36ac922ff8c3357/packages/rax/src/vdom/instance.js#L44
   * ref: https://github.com/alibaba/rax/blob/13d80a491f18c74034aa9b05c36ac922ff8c3357/packages/driver-dom/src/index.js#L75
   */
  if (container === null) {
    container = document.querySelector('body')!;
  }

  const root = createRoot(container, optionsOrCallback as RootOptions);
  root.render(element as ReactNode);

  // Save container and root relation.
  containerRootMap.set(container, root);

  if (isFunction(callback)) {
    callback.call(element);
  }
  return element;
}
