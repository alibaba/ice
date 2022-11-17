import { jsx, Fragment, jsxs } from './index.js';

export { Fragment };
export function jsxDEV(
  type: any,
  props: object,
  key: string,
  isStaticChildren: boolean,
  source: object,
  self: any,
) {
  return isStaticChildren ? jsxs(type, props, key, source, self) : jsx(type, props, key, source, self);
}
