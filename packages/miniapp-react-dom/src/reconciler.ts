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

// React 19 transition context placeholder
const NotPendingTransition = null;

// HostTransitionContext for React 19
const HostTransitionContext = {
  _currentValue: NotPendingTransition,
  _currentValue2: NotPendingTransition,
  _provider: null,
};

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
  hideTextInstance: (textInstance: Text) => void;
  unhideInstance: (instance: Element, props) => void;
  unhideTextInstance: (textInstance: Text, text: string) => void;
  getCurrentEventPriority: () => number;
  detachDeletedInstance: () => void;
  resolveUpdatePriority: () => number;
  setCurrentUpdatePriority: (priority: number) => void;
  getCurrentUpdatePriority: () => number;
  shouldAttemptEagerTransition: () => boolean;
  resolveEventTimeStamp: () => number;
  resolveEventType: () => number;
  trackSchedulerEvent: () => void;
  resetTextContent: (instance: Element) => void;
  maySuspendCommit: (type: string, props: Props) => boolean;
  preloadInstance: (type: string, props: Props) => boolean;
  startSuspendingCommit: () => unknown;
  suspendInstance: (suspendedState: unknown, instance: Element, type: string, props: Props) => void;
  waitForCommitToBeReady: (suspendedState: unknown) => ((initiateCommit: () => void) => () => void) | null;
  NotPendingTransition: unknown;
  HostTransitionContext: typeof HostTransitionContext;
  resetFormInstance: (instance: Element) => void;
  bindToConsole: (methodName: string, fn: (...args: unknown[]) => unknown, browserNativeMethod: (...args: unknown[]) => unknown) => (...args: unknown[]) => unknown;
  scheduleMicrotask: (callback: () => void) => void;
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

  resolveUpdatePriority() {
    // Default priority: 16 = DefaultEventPriority
    return 16;
  },

  setCurrentUpdatePriority() {
    // noop for miniapp
  },

  getCurrentUpdatePriority() {
    return 16; // DefaultEventPriority
  },

  shouldAttemptEagerTransition() {
    return false;
  },

  resolveEventTimeStamp() {
    return 0;
  },

  resolveEventType() {
    return 0;
  },

  trackSchedulerEvent() {
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

  commitUpdate(instance, type, oldProps, newProps, _internalHandle) {
    updateProps(instance, oldProps, newProps);
  },

  hideInstance(instance) {
    const { style } = instance;
    style.setProperty('display', 'none');
  },

  hideTextInstance(textInstance) {
    // For text nodes, we can't really hide them in the same way as elements
    // Store the original text and clear it
    textInstance.nodeValue = '';
  },

  unhideInstance(instance, props) {
    const styleProp = props.style;
    let display = (styleProp && Object.prototype.hasOwnProperty.call(styleProp, 'display')) ? styleProp.display : null;
    display = display == null || isBoolean(display) || display === '' ? '' : (`${display}`).trim();
    // eslint-disable-next-line dot-notation
    instance.style['display'] = display;
  },

  unhideTextInstance(textInstance, text) {
    // Restore the text content
    textInstance.nodeValue = text;
  },

  resetTextContent(instance) {
    instance.textContent = '';
  },

  maySuspendCommit() {
    return false;
  },

  preloadInstance() {
    return false;
  },

  startSuspendingCommit() {
    return null;
  },

  suspendInstance() {
    // noop
  },

  waitForCommitToBeReady() {
    return null;
  },

  NotPendingTransition,

  HostTransitionContext,

  resetFormInstance() {
    // noop - miniapp doesn't have native form reset
  },

  bindToConsole(_methodName, fn) {
    return fn;
  },

  scheduleMicrotask(callback) {
    // React 19 requires scheduleMicrotask to execute synchronously for flushSyncWork to work
    // Using queueMicrotask or direct call depending on environment
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(callback);
    } else if (!isUndefined(Promise)) {
      Promise.resolve(null).then(callback).catch((error) => {
        setTimeout(() => { throw error; });
      });
    } else {
      // Fallback: execute synchronously
      callback();
    }
  },

  clearContainer(element) {
    if (element.childNodes.length > 0) {
      element.textContent = '';
    }
  },

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
    version: '19.0.0',
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