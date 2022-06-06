import React, { cloneElement, isValidElement, createFactory } from 'react';
/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @param others
 * @returns Element
 */ export function createElement(type, props, children, ...others) {
    return React.createElement(type, props, children, ...others);
}
export { cloneElement, isValidElement, createFactory };
