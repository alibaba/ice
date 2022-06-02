import React, { cloneElement, isValidElement, Children, createFactory } from 'react';

/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param config
 * @param children
 * @param others
 * @returns Element
 */
export function createElement(type: any, config: Object, children: any, ...others: any) {
  return React.createElement(type, config, children, ...others);
}

export {
  cloneElement,
  isValidElement,
  Children,
  createFactory
}
