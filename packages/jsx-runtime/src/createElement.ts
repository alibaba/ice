import { createElement as reactCreateElement } from 'react';
import { hijackElementProps } from './style.js';
export function createElement(type: any, props: any, ...children: any[]) {
  return reactCreateElement(type, hijackElementProps(props), ...children);
}
