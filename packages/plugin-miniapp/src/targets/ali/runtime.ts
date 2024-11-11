import { hooks, mergeInternalComponents } from '@ice/shared';
import { createEventHandlerForThirdComponent, bindEventHandlersForThirdComponentNode } from '@ice/miniapp-runtime';
import { components } from './components.js';

mergeInternalComponents(components);

hooks.tap('onAddEvent', (type, handler, options, node) => {
  const instance = node._root.ctx;
  if (!instance) {
    return;
  }
  instance[`eh_${node.sid}_${type}`] = createEventHandlerForThirdComponent(node.sid, type);
});

hooks.tap('hydrateNativeComponentNode', node => {
  bindEventHandlersForThirdComponentNode(node);
});
