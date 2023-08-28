import type { Root } from 'react-dom/client';

/**
 * A WeakMap that keeps track of container mouted root.
 * @key The container element passed to `render` function, which call `createRoot` and `root.render` internally.
 * @value The root instance returned by `createRoot` function.
 */
export const containerRootMap = new WeakMap<Element | DocumentFragment, Root>();
