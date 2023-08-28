import type { Container } from 'react-dom';
import { containerRootMap } from './container-root-map.js';

/**
 * Unmount a component rendered to a DOM node.
 * To unmount a component strictly, its state and event handlers should be cleaned up appropriately,
 * Which means we should let `React` do the unmounting work.
 *
 * In React 18, this method will be replaced by [root.unmount](https://react.dev/reference/react-dom/client/createRoot#root-unmount),
 * We preserve this method for Rax API compatibility.
 *
 * As we cannot approach the root instance from container element directly,
 * we use a WeakMap to keep track of container mouted root,
 * which saves the container-root relation in `render`(and `createRoot()` under the hood) execution.

 * @param container The container element which to be unmounted.
 */
export default function unmountComponentAtNode(container: Container) {
  const relatedRoot = containerRootMap.get(container);
  // Ensure the root exists, then unmount root and remove it from containerRootMap.
  if (relatedRoot) {
    relatedRoot.unmount();
    containerRootMap.delete(container);
  }
}
