import type { Element } from '@ice/miniapp-runtime';
import type { ReactNode } from 'react';
import type { OpaqueRoot } from 'react-reconciler';

import { IceMiniappReconciler } from './reconciler.js';

export const ContainerMap: WeakMap<Element, Root> = new WeakMap();

type Renderer = typeof IceMiniappReconciler;

export type Callback = () => void | null | undefined;

// Default error handlers for React 19
const defaultOnUncaughtError = (error: Error) => {
  console.error('Uncaught error:', error);
};

const defaultOnCaughtError = (error: Error) => {
  console.error('Caught error:', error);
};

const defaultOnRecoverableError = (error: Error) => {
  console.error('Recoverable error:', error);
};

const defaultOnDefaultTransitionIndicator = () => {
  // noop
};

class Root {
  private renderer: Renderer;
  private internalRoot: OpaqueRoot;

  public constructor(renderer: Renderer, domContainer: Element, isConcurrentRoot = false) {
    this.renderer = renderer;
    /** ConcurrentRoot & LegacyRoot: react-reconciler/src/ReactRootTags.js */
    // React 19 createContainer signature:
    // createContainer(containerInfo, tag, hydrationCallbacks, isStrictMode,
    //   concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError,
    //   onCaughtError, onRecoverableError, onDefaultTransitionIndicator)
    this.internalRoot = renderer.createContainer(
      domContainer,
      isConcurrentRoot ? 1 : 0, // LegacyRoot = 0, ConcurrentRoot = 1
      null, // hydrationCallbacks
      false, // isStrictMode
      null, // concurrentUpdatesByDefaultOverride
      null, // identifierPrefix
      defaultOnUncaughtError,
      defaultOnCaughtError,
      defaultOnRecoverableError,
      defaultOnDefaultTransitionIndicator,
    );
  }

  public render(children: ReactNode, cb: Callback) {
    const { renderer, internalRoot } = this;
    // In React 19, use updateContainerSync + flushSyncWork for synchronous rendering
    renderer.updateContainerSync(children, internalRoot, null, cb);
    renderer.flushSyncWork();
    return renderer.getPublicRootInstance(internalRoot);
  }

  public unmount(cb: Callback) {
    this.renderer.updateContainerSync(null, this.internalRoot, null, cb);
    this.renderer.flushSyncWork();
  }
}

export function render(element: ReactNode, domContainer: Element, cb: Callback) {
  const oldRoot = ContainerMap.get(domContainer);
  if (oldRoot != null) {
    return oldRoot.render(element, cb);
  }

  const root = new Root(IceMiniappReconciler, domContainer);
  ContainerMap.set(domContainer, root);
  return root.render(element, cb);
}

export function createRoot(domContainer: Element) {
  const oldRoot = ContainerMap.get(domContainer);
  if (oldRoot != null) {
    return oldRoot;
  }
  const root = new Root(IceMiniappReconciler, domContainer, true);
  ContainerMap.set(domContainer, root);
  return root;
}
