// hook
// dom-external
import './dom-external/index.js';

export { hooks } from '@ice/shared';
// bom
export { document } from './bom/document.js';
export { getComputedStyle } from './bom/getComputedStyle.js';
export { navigator } from './bom/navigator.js';
export { caf as cancelAnimationFrame, now, raf as requestAnimationFrame } from './bom/raf.js';
export { window } from './bom/window.js';
// dom
export { Element } from './dom/element.js';
export { createEvent, eventHandler, Event } from './dom/event.js';
export { FormElement } from './dom/form.js';
export { Node } from './dom/node.js';
export { RootElement } from './dom/root.js';
export { Style } from './dom/style.js';
export { SVGElement } from './dom/svg.js';
export { Text } from './dom/text.js';
export { MutationObserver } from './dom-external/mutation-observer/index.js';
// others
export { Current, getCurrentInstance } from './current.js';
export { eventSource } from './dom/event-source.js';
export {
  addLeadingSlash,
  createComponentConfig,
  createPageConfig,
  createRecursiveComponentConfig,
  getPageInstance,
  injectPageInstance,
  safeExecute,
  stringify,
} from './dsl/common.js';
export * from './emitter/emitter.js';
export { hydrate } from './hydrate.js';
export { nextTick } from './next-tick.js';
export { options } from './options.js';
export { incrementId } from './utils/index.js';
// typings
export * from './dsl/instance.js';
export * from './interface/index.js';
