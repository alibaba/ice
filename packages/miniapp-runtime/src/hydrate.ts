import { hooks, Shortcuts, toCamelCase } from '@ice/shared';

import {
  CATCH_VIEW,
  CATCHMOVE,
  CLASS,
  ID,
  PURE_VIEW,
  STYLE,
  VIEW,
} from './constants/index.js';
import type { Element } from './dom/element.js';
import type { Text } from './dom/text.js';
import type { MiniData, MiniElementData } from './interface/index.js';
import { getComponentsAlias, isComment, isHasExtractProp, isText } from './utils/index.js';

let SPECIAL_NODES;
let componentsAlias;

/**
 * React also has a fancy function's name for this: `hydrate()`.
 * You may have been heard `hydrate` as a SSR-related function,
 * actually, `hydrate` basicly do the `render()` thing, but ignore some properties,
 * it's a vnode traverser and modifier: that's exactly what ICE's doing in here.
 */
export function hydrate(node: Element | Text): MiniData {
  if (!componentsAlias) {
    // 初始化 componentsAlias
    componentsAlias = getComponentsAlias();
  }

  if (!SPECIAL_NODES) {
    // 初始化 SPECIAL_NODES
    SPECIAL_NODES = hooks.call('getSpecialNodes')!;
  }

  const { nodeName } = node;

  if (isText(node)) {
    return {
      [Shortcuts.Text]: node.nodeValue,
      [Shortcuts.NodeName]: componentsAlias[nodeName]._num,
    };
  }

  const data: MiniElementData = {
    [Shortcuts.NodeName]: nodeName,
    sid: node.sid,
  };

  if (node.uid !== node.sid) {
    data.uid = node.uid;
  }

  if (!node.isAnyEventBinded() && SPECIAL_NODES.indexOf(nodeName) > -1) {
    data[Shortcuts.NodeName] = `static-${nodeName}`;
    if (nodeName === VIEW && !isHasExtractProp(node)) {
      data[Shortcuts.NodeName] = PURE_VIEW;
    }
  }

  const { props } = node;
  for (const prop in props) {
    const propInCamelCase = toCamelCase(prop);
    if (
      !prop.startsWith('data-') && // 在 node.dataset 的数据
      prop !== CLASS &&
      prop !== STYLE &&
      prop !== ID &&
      propInCamelCase !== CATCHMOVE
    ) {
      data[propInCamelCase] = props[prop];
    }
    if (nodeName === VIEW && propInCamelCase === CATCHMOVE && props[prop] !== false) {
      data[Shortcuts.NodeName] = CATCH_VIEW;
    }
  }

  // Children
  data[Shortcuts.Childnodes] = node.childNodes.filter(node => !isComment(node)).map(hydrate);

  if (node.className !== '') {
    data[Shortcuts.Class] = node.className;
  }

  const { cssText } = node;
  if (cssText !== '' && nodeName !== 'swiper-item') {
    data[Shortcuts.Style] = cssText;
  }

  hooks.call('modifyHydrateData', data);

  const nn = data[Shortcuts.NodeName];
  const componentAlias = componentsAlias[nn];
  if (componentAlias) {
    data[Shortcuts.NodeName] = componentAlias._num;
    for (const prop in data) {
      if (prop in componentAlias) {
        data[componentAlias[prop]] = data[prop];
        delete data[prop];
      }
    }
  } else {
    hooks.call('hydrateNativeComponentNode', node);
  }

  return data;
}
