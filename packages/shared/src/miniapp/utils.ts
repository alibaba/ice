import { toCamelCase, toDashed } from '../utils.js';
import type { internalComponents } from './components.js';

export function getComponentsAlias(origin: typeof internalComponents) {
  const mapping = {};
  const viewAttrs = origin.View;
  const extraList = {
    '#text': {},
    StaticView: viewAttrs,
    StaticImage: origin.Image,
    StaticText: origin.Text,
    PureView: viewAttrs,
    CatchView: viewAttrs,
  };
  origin = { ...origin, ...extraList };
  Object.keys(origin)
    .sort((a, b) => {
      const reg = /^(Static|Pure|Catch)*(View|Image|Text)$/;
      const isACommonly = reg.test(a);
      const isBCommonly = reg.test(b);
      if (isACommonly && isBCommonly) {
        return a > b ? 1 : -1;
      } else if (isACommonly) {
        return -1;
      } else if (isBCommonly) {
        return 1;
      } else {
        return a >= b ? 1 : -1;
      }
    })
    .forEach((key, num) => {
      const obj = {
        _num: String(num),
      };
      Object.keys(origin[key])
        .filter(attr => !(/^bind/.test(attr)) && !['focus', 'blur'].includes(attr))
        .sort()
        .forEach((attr, index) => {
          obj[toCamelCase(attr)] = `p${index}`;
        });
      mapping[toDashed(key)] = obj;
    });

  return mapping;
}
