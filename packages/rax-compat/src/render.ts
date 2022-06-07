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
export default function render(element: any, container: any, options: any, callback: Function) {
  if (isFunction(options)) {
    callback = options;
    options = null;
  }

  const root = createRoot(container, options);
  root.render(element);
  if (isFunction(callback)) {
    callback.call(element);
  }
  return element;
}
