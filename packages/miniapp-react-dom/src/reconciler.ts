/* eslint-disable @typescript-eslint/indent */
import type { Element, Text } from '@ice/miniapp-runtime';
import { document } from '@ice/miniapp-runtime';
import { EMPTY_ARR, isBoolean, isUndefined, noop } from '@ice/shared';
import type { HostConfig } from 'react-reconciler';
import Reconciler from 'react-reconciler';
import * as scheduler from 'scheduler';

import type { Props } from './props.js';
import { updateProps } from './props.js';

const {
  unstable_now: now,
} = scheduler;

function returnFalse() {
  return false;
}

const hostConfig: HostConfig<
  string, // Type
  Props, // Props
  Element, // Container
  Element, // Instance
  Text, // TextInstance
  Element, // SuspenseInstance
  Element, // HydratableInstance
  Element, // PublicInstance
  Record<string, any>, // HostContext
  string[], // UpdatePayload
  unknown, // ChildSet
  unknown, // TimeoutHandle
  unknown // NoTimeout
> & {
  hideInstance: (instance: Element) => void;
  unhideInstance: (instance: Element, props) => void;
  getCurrentEventPriority: () => number;
  detachDeletedInstance: () => void;
} = {
  createInstance(type) {
    return document.createElement(type);
  },

  createTextInstance(text) {
    return document.createTextNode(text);
  },

  getPublicInstance(inst: Element) {
    return inst;
  },

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  getCurrentEventPriority() {
    // 因 @types/react-reconciler 未更新，ts会报错，这里直接返回16
    return 16; // import { DefaultEventPriority } from 'react-reconciler/constants'
  },

  detachDeletedInstance() {
    // noop
  },

  appendChild(parent, child) {
    parent.appendChild(child);
  },

  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },

  appendChildToContainer(parent, child) {
    parent.appendChild(child);
  },

  removeChild(parent, child) {
    parent.removeChild(child);
  },

  removeChildFromContainer(parent, child) {
    parent.removeChild(child);
  },

  insertBefore(parent, child, refChild) {
    parent.insertBefore(child, refChild);
  },

  insertInContainerBefore(parent, child, refChild) {
    parent.insertBefore(child, refChild);
  },

  commitTextUpdate(textInst, _, newText) {
    textInst.nodeValue = newText;
  },

  finalizeInitialChildren(dom, _, props) {
    updateProps(dom, {}, props);
    return false;
  },

  prepareUpdate() {
    return EMPTY_ARR;
  },

  commitUpdate(dom, _payload, _type, oldProps, newProps) {
    updateProps(dom, oldProps, newProps);
  },

  hideInstance(instance) {
    const { style } = instance;
    style.setProperty('display', 'none');
  },

  unhideInstance(instance, props) {
    const styleProp = props.style;
    let display = (styleProp && Object.prototype.hasOwnProperty.call(styleProp, 'display')) ? styleProp.display : null;
    display = display == null || isBoolean(display) || display === '' ? '' : (`${display}`).trim();
    // eslint-disable-next-line dot-notation
    instance.style['display'] = display;
  },

  clearContainer(element) {
    if (element.childNodes.length > 0) {
      element.textContent = '';
    }
  },

  queueMicrotask: !isUndefined(Promise)
  ? callback =>
      Promise.resolve(null)
        .then(callback)
        .catch((error) => {
          setTimeout(() => {
            throw error;
          });
        })
  : setTimeout,

  shouldSetTextContent: returnFalse,
  prepareForCommit() { return null; },
  resetAfterCommit: noop,
  commitMount: noop,
  now,
  cancelTimeout: clearTimeout,
  scheduleTimeout: setTimeout,
  preparePortalMount: noop,
  noTimeout: -1,
  supportsMutation: true,
  supportsPersistence: false,
  isPrimaryRenderer: true,
  supportsHydration: false,
};

const IceMiniappReconciler = Reconciler(hostConfig);

if (process.env.NODE_ENV !== 'production') {
  const foundDevTools = IceMiniappReconciler.injectIntoDevTools({
    bundleType: 1,
    version: '18.0.0',
    rendererPackageName: '@ice/miniapp-react-dom',
  });
  if (!foundDevTools) {
    // eslint-disable-next-line no-console
    console.info('%cDownload the React DevTools ' + 'for a better development experience: ' + 'https://reactjs.org/link/react-devtools', 'font-weight:bold');
  }
}

export {
  IceMiniappReconciler,
};
