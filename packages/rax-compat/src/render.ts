import { createRoot } from 'react-dom/client';

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
  const root = createRoot(container);
  root.render(element);
  const componentInstance = '?'; // TODO..
  callback.call(componentInstance);
  return componentInstance;
}
