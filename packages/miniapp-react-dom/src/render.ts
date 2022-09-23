import type { Element } from '@ice/miniapp-runtime';
import type { ReactNode } from 'react';
import type { OpaqueRoot } from 'react-reconciler';

import { IceMiniappReconciler } from './reconciler.js';

export const ContainerMap: WeakMap<Element, Root> = new WeakMap();

type Renderer = typeof IceMiniappReconciler;

export type Callback = () => void | null | undefined;

class Root {
  private renderer: Renderer;
  private internalRoot: OpaqueRoot;

  public constructor(renderer: Renderer, domContainer: Element, isConcurrentRoot = false) {
    this.renderer = renderer;
    /** ConcurrentRoot & LegacyRoot: react-reconciler/src/ReactRootTags.js */
    this.internalRoot = renderer.createContainer(domContainer, isConcurrentRoot ? 1 : 0, false, null);
  }

  public render(children: ReactNode, cb: Callback) {
    const { renderer, internalRoot } = this;
    renderer.updateContainer(children, internalRoot, null, cb);
    return renderer.getPublicRootInstance(internalRoot);
  }

  public unmount(cb: Callback) {
    this.renderer.updateContainer(null, this.internalRoot, null, cb);
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
