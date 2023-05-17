import type {
  Attributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import { createElement as _createElement } from 'react';
import { createJSXElementFactory } from './compat/element.js';

const jsx = createJSXElementFactory((type: any, props: any, ...children: ReactNode[]) =>
  _createElement(type, props, ...children));

/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @returns Element
 */
export function createElement<P>(
  type: FunctionComponent<P> | string,
  props?: Attributes & P | null,
  ...children: ReactNode[]): ReactElement {
  return jsx(type, props, ...children);
}
